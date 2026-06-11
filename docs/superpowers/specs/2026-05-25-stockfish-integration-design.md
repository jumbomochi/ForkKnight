# Stockfish Integration — Design Spec

**Date:** 2026-05-25
**Status:** Approved
**Author:** Huiliang Lui (with Claude)

## Problem

The Play vs Computer feature ships five FIDE-aligned difficulty tiers (800, 1000, 1200, 1500, 1900 Elo), but the engine driving it is a pure-TypeScript minimax in `src/services/computer/StockfishService.ts` that maxes out at depth 4 (~1200–1400 strength). Tournament and Advanced tiers are nominal — players selecting them get the same engine as Club Player. Hints suffer the same ceiling.

A prior attempt to use the `stockfish` npm package (commit `1798fc9`) failed because that package relies on Web Workers, which React Native does not provide. The package is still listed in `package.json` as dead weight.

## Goal

Replace the TS minimax with real Stockfish, integrated as a native module so it runs at full strength on iOS and Android, throttled per difficulty tier to match the published Elo of each level. Cover both `getBestMove` (Play vs Computer) and `getHintMove` (in-game hints).

## Non-goals

- Renaming `StockfishService` (existing call sites stay).
- Puzzle generation or validation tooling — puzzles continue to ship pre-baked in `assets/puzzles.json`.
- Opening book or NNUE customization beyond Stockfish defaults.
- Multi-threaded Stockfish — single thread is plenty for the move-time budgets a kids' app uses.
- Web build support for the engine — the fallback covers it.

## Constraints

- Expo SDK 54 with `expo-dev-client`; CNG workflow; New Architecture enabled.
- `ios/` is already prebuilt and checked in; `android/` is not yet generated.
- Children's app subject to COPPA — engine must run on-device, no network calls.
- Jest tests must run without the native module loaded.

## Architecture

### Layout

```
src/services/computer/
  StockfishService.ts            ← unchanged public API; internally delegates
  engine/
    types.ts                     ← UciEngine interface
    NativeStockfishEngine.ts     ← UCI line protocol over native bridge
    MinimaxEngine.ts             ← extracted current TS minimax (fallback/test)
    strengthProfile.ts           ← rating → engine opts + blunder rate

modules/expo-stockfish/          ← local Expo module + config plugin
  app.plugin.js                  ← config plugin entry (adds Pod/Gradle wiring)
  expo-module.config.json
  ios/
    ExpoStockfishModule.swift    ← runs engine on background queue, emits stdout lines
    ExpoStockfish.podspec
  android/
    src/main/java/.../ExpoStockfishModule.kt
    build.gradle                 ← CMake build of vendored cpp/
  cpp/                           ← vendored Stockfish 17.1 source (BSD-style header preserved)
```

### Native module contract

The native side knows nothing about chess. It is a transport for the UCI line protocol.

```ts
interface ExpoStockfish {
  start(): Promise<void>;    // spawn engine, send "uci" + "isready", resolve on "readyok"
  send(command: string): void; // write one UCI line to engine stdin
  stop(): Promise<void>;     // send "quit", tear down the process
}
// Emits "stockfish.line" events with payload { line: string } for every stdout line.
```

Native implementations run Stockfish on a background queue/thread. Output is line-buffered and dispatched individually via `NativeEventEmitter`. No UCI parsing happens in Swift or Kotlin; that lives in the TS adapter so the bridge ABI stays trivial.

Stockfish version pinned to **17.1** (current stable as of pin date). The version is bumped deliberately via a single edit to `cpp/`, never opportunistically — engine strength is part of the user-visible product.

### Engine adapter interface

```ts
interface UciEngine {
  initialize(): Promise<void>;
  bestMove(
    fen: string,
    opts: { movetimeMs: number; skill?: number; uciElo?: number; maxError?: number }
  ): Promise<string>; // "e2e4" or "e7e8q"
  dispose(): Promise<void>;
}
```

Two implementations:

- `NativeStockfishEngine` — wraps the `ExpoStockfish` module. Each `bestMove` call:
  1. Issues `setoption` commands for the requested skill/elo.
  2. Sends `position fen <fen>` followed by `go movetime <ms>`.
  3. Listens for the next `bestmove <uci>` line, resolves with the move string.
  4. Tags each request with a monotonic id; stale `bestmove` lines (e.g. user undid) are dropped.
- `MinimaxEngine` — the existing minimax extracted verbatim, conformed to the same interface. Used when the native module is unavailable (Jest, web, native load failure).

### StockfishService

Public API stays exactly as it is today (`getBestMove`, `getHintMove`, `calculateNewRating`, `getComputerRating`, `dispose`). The only change is that the constructor picks an engine and the move-generation methods compose three things:

1. `strengthProfile.fromRating(rating)` — pure function, returns `{ uciElo?, skillLevel?, maxError?, movetimeMs, blunderRate }`.
2. `engine.bestMove(fen, opts)` — get Stockfish's reply.
3. Blunder injection — with probability `blunderRate`, replace the engine's move with a random legal move sourced from `chess.js`.

`getHintMove` always uses a fixed strong profile (`UCI_Elo 1800`, movetime 600 ms, blunder rate 0).

`getStockfishService()` remains the singleton entry point; only its construction changes.

### Strength profile

| Tier         | Rating | Stockfish settings                                       | Movetime | Blunder rate |
|--------------|--------|----------------------------------------------------------|----------|--------------|
| Beginner     | 800    | `Skill Level 0`, `Skill Level Maximum Error 900`         | 200 ms   | 40%          |
| Novice       | 1000   | `Skill Level 3`                                          | 300 ms   | 20%          |
| Club Player  | 1200   | `Skill Level 6`                                          | 500 ms   | 8%           |
| Tournament   | 1500   | `UCI_LimitStrength true`, `UCI_Elo 1500`                 | 800 ms   | 0%           |
| Advanced     | 1900   | `UCI_LimitStrength true`, `UCI_Elo 1900`                 | 1200 ms  | 0%           |

`Skill Level` is used for the three sub-1320 tiers because Stockfish's `UCI_LimitStrength` floor is 1320. Blunder injection layers on top to break the floor downward without making the engine look brain-dead — a Skill-Level-0 Stockfish still sometimes finds tactics, and 40% random-move injection on Beginner produces play that feels appropriate for a child who just learned how pieces move.

`strengthProfile.fromRating` accepts any rating, not just the five tier values, so future rating adjustments via Elo updates still produce sensible engine behavior.

## Data flow per move

1. `app/game.tsx` calls `stockfish.getBestMove(fen, rating)`.
2. `StockfishService` looks up the strength profile.
3. Adapter sends `setoption` lines, then `position fen ...`, then `go movetime <ms>`.
4. Native module spawns/uses its background queue, pushes stdout lines as events.
5. Adapter matches the request id, parses the `bestmove` line, resolves the promise.
6. `StockfishService` rolls for blunder injection; returns final move string.
7. `app/game.tsx` applies it via `chess.js`.

## Lifecycle

- **Lazy init**: native engine starts on the first `initialize()` call (already triggered by `app/game.tsx` mount).
- **Singleton**: kept alive across navigations within the app session.
- **Backgrounding**: on `AppState change → background`, send `stop` (interrupts any in-flight `go`) but keep the process alive. Stockfish's resident set is ~10 MB; the wakeup cost is worse than the memory cost.
- **Termination**: on `AppState change → inactive` for >60 s, or on explicit `dispose()`, send `quit` and tear down.

## Error handling

- **Native start failure** (module not present, malformed binary, etc.): log once, swap the singleton's engine to `MinimaxEngine`, continue silently. The existing `Alert.alert("Error", ...)` in `app/game.tsx:151` becomes unreachable and is removed.
- **`bestmove` timeout** (no response within `movetimeMs + 2000 ms`): adapter sends `stop`, rejects the promise. `StockfishService` catches and picks a random legal move as last-resort fallback so the game does not hang.
- **Malformed UCI output**: same as timeout — log and fall back to random legal move.
- **Stale requests** (user undid, navigated away): handled by request id matching; stale `bestmove` lines are dropped, not surfaced as errors.

## Testing

- **Unit tests** for `strengthProfile.fromRating` — table-driven, asserts boundary cases (799, 800, 801, 1319, 1320, 9999).
- **Unit tests** for `MinimaxEngine` — basic legality and "doesn't lose mate in 1" checks. Keeps the existing minimax exercised so the fallback stays trustworthy.
- **Contract test** for the `UciEngine` interface — runs the same `bestMove` call against `MinimaxEngine` (and `NativeStockfishEngine` when the native module is available) on a small fixture of FENs; asserts each returns a legal move. Catches adapter bugs.
- **Blunder injection** — seedable RNG in `StockfishService` so blunder-rate behavior is deterministic in tests.
- **Manual verification** required after first prebuild:
  - iOS simulator: engine starts in <500 ms, all five tiers playable, Advanced clearly stronger than Club Player.
  - Physical Android device: same checks after `expo prebuild --platform android`.
  - Background/foreground cycle mid-game leaves the engine responsive.

## Migration / cleanup

- Delete `"stockfish": "^17.1.0"` from `package.json` and the lockfile entry.
- Remove the "Stockfish WASM" mention from `.claude/development.md` — replace with a note that real Stockfish is bundled via the local `expo-stockfish` module.
- `expo prebuild --platform android` to generate the `android/` folder, then commit it.
- `expo prebuild --platform ios` to refresh `ios/` with the new Pod.

## Open questions

None at design time. Implementation may surface tactical choices (e.g. exact CMake invocation for the Android build, how to package Stockfish's syzygy/NNUE data files — likely we omit NNUE on mobile for size). Those get resolved during the implementation plan.

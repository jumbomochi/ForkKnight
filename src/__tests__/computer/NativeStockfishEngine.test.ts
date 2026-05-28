import { NativeStockfishEngine } from "@/services/computer/engine/NativeStockfishEngine";
import { NativeStockfishBridge } from "@/services/computer/engine/types";

/** Minimal fake bridge that scripts engine responses. */
class FakeBridge implements NativeStockfishBridge {
  private listeners: Array<(e: { line: string }) => void> = [];
  public sent: string[] = [];
  public scripted: Array<{ matcher: (cmd: string) => boolean; emit: string[] }> = [];

  async start() {
    this.emit("readyok"); // handshake reply
  }
  send(command: string) {
    this.sent.push(command);
    for (const s of this.scripted) {
      if (s.matcher(command)) {
        s.emit.forEach((line) => this.emit(line));
      }
    }
  }
  async stop() {}
  onLine(listener: (e: { line: string }) => void) {
    this.listeners.push(listener);
    return {
      remove: () => {
        this.listeners = this.listeners.filter((l) => l !== listener);
      },
    };
  }
  emit(line: string) {
    this.listeners.forEach((l) => l({ line }));
  }
}

describe("NativeStockfishEngine", () => {
  it("sends UCI handshake on initialize", async () => {
    const bridge = new FakeBridge();
    const engine = new NativeStockfishEngine(bridge);
    bridge.scripted.push({
      matcher: (c) => c === "uci",
      emit: ["id name Stockfish 17.1", "uciok"],
    });
    bridge.scripted.push({
      matcher: (c) => c === "isready",
      emit: ["readyok"],
    });
    await engine.initialize();
    expect(bridge.sent).toContain("uci");
    expect(bridge.sent).toContain("isready");
  });

  it("sets Skill Level for sub-1320 tiers", async () => {
    const bridge = new FakeBridge();
    bridge.scripted.push({ matcher: (c) => c === "uci", emit: ["uciok"] });
    bridge.scripted.push({ matcher: (c) => c === "isready", emit: ["readyok"] });
    bridge.scripted.push({
      matcher: (c) => c.startsWith("go"),
      emit: ["bestmove e2e4"],
    });
    const engine = new NativeStockfishEngine(bridge);
    await engine.initialize();

    const move = await engine.bestMove(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      { movetimeMs: 200, skill: 3 },
    );
    expect(move).toBe("e2e4");
    expect(bridge.sent).toContain("setoption name Skill Level value 3");
    expect(bridge.sent).not.toContain("setoption name UCI_LimitStrength value true");
  });

  it("sets UCI_Elo for 1320+ tiers", async () => {
    const bridge = new FakeBridge();
    bridge.scripted.push({ matcher: (c) => c === "uci", emit: ["uciok"] });
    bridge.scripted.push({ matcher: (c) => c === "isready", emit: ["readyok"] });
    bridge.scripted.push({
      matcher: (c) => c.startsWith("go"),
      emit: ["bestmove e7e8q"],
    });
    const engine = new NativeStockfishEngine(bridge);
    await engine.initialize();

    const move = await engine.bestMove(
      "8/4P3/8/8/8/8/8/k1K5 w - - 0 1",
      { movetimeMs: 800, uciElo: 1500 },
    );
    expect(move).toBe("e7e8q");
    expect(bridge.sent).toContain("setoption name UCI_LimitStrength value true");
    expect(bridge.sent).toContain("setoption name UCI_Elo value 1500");
  });

  it("drops stale bestmove from a previous request", async () => {
    const bridge = new FakeBridge();
    bridge.scripted.push({ matcher: (c) => c === "uci", emit: ["uciok"] });
    bridge.scripted.push({ matcher: (c) => c === "isready", emit: ["readyok"] });

    const engine = new NativeStockfishEngine(bridge);
    await engine.initialize();

    // Issue first bestMove — no scripted response so it stays pending.
    const firstPromise = engine
      .bestMove("startpos", { movetimeMs: 200 })
      .catch((e) => e as Error);

    // Real Stockfish behavior on cancellation: a "stop" command produces the
    // bestmove for the previously-cancelled search BEFORE we issue the new
    // "go". The adapter should drop that stale bestmove and resolve only the
    // new one.
    bridge.scripted.push({ matcher: (c) => c === "stop", emit: ["bestmove h2h3"] });
    bridge.scripted.push({
      matcher: (c) => c.startsWith("go"),
      emit: ["bestmove a2a3"],
    });

    const secondMove = await engine.bestMove("startpos", { movetimeMs: 200 });
    expect(secondMove).toBe("a2a3");

    const firstResult = await firstPromise;
    expect(firstResult).toBeInstanceOf(Error);
  });
});

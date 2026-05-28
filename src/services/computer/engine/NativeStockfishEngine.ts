import { EngineOpts, NativeStockfishBridge, UciEngine } from "./types";

interface PendingRequest {
  id: number;
  resolve: (move: string) => void;
  reject: (err: Error) => void;
}

const HANDSHAKE_TIMEOUT_MS = 3000;
const BESTMOVE_TIMEOUT_BUFFER_MS = 2000;

export class NativeStockfishEngine implements UciEngine {
  private subscription: { remove: () => void } | null = null;
  private pending: PendingRequest | null = null;
  private nextId = 1;
  private waitingFor: ((line: string) => boolean) | null = null;
  private waitResolve: (() => void) | null = null;

  constructor(private bridge: NativeStockfishBridge) {}

  async initialize(): Promise<void> {
    this.subscription = this.bridge.onLine((e) => this.handleLine(e.line));
    await this.bridge.start();
    // Set up the waiter BEFORE sending so synchronous bridge responses are captured.
    const uciOk = this.waitFor((line) => line === "uciok", HANDSHAKE_TIMEOUT_MS);
    this.bridge.send("uci");
    await uciOk;
    const readyOk = this.waitFor((line) => line === "readyok", HANDSHAKE_TIMEOUT_MS);
    this.bridge.send("isready");
    await readyOk;
  }

  async bestMove(fen: string, opts: EngineOpts): Promise<string> {
    // Cancel any in-flight request first.
    if (this.pending) {
      this.pending.reject(new Error("Cancelled by newer request"));
      this.pending = null;
    }

    this.applyOptions(opts);
    this.bridge.send(`position fen ${fen}`);

    const id = this.nextId++;

    // Register the pending request BEFORE sending "go" so that a synchronous
    // FakeBridge response (emitted inside send()) can resolve it immediately.
    return new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (this.pending?.id === id) {
          this.pending = null;
          this.bridge.send("stop");
          reject(new Error("bestmove timeout"));
        }
      }, opts.movetimeMs + BESTMOVE_TIMEOUT_BUFFER_MS);

      this.pending = {
        id,
        resolve: (move) => {
          clearTimeout(timeout);
          resolve(move);
        },
        reject: (err) => {
          clearTimeout(timeout);
          reject(err);
        },
      };

      this.bridge.send(`go movetime ${opts.movetimeMs}`);
    });
  }

  async dispose(): Promise<void> {
    if (this.pending) {
      this.pending.reject(new Error("Disposed"));
      this.pending = null;
    }
    this.subscription?.remove();
    this.subscription = null;
    await this.bridge.stop();
  }

  private applyOptions(opts: EngineOpts): void {
    if (opts.uciElo !== undefined) {
      this.bridge.send("setoption name UCI_LimitStrength value true");
      this.bridge.send(`setoption name UCI_Elo value ${opts.uciElo}`);
    } else {
      this.bridge.send("setoption name UCI_LimitStrength value false");
    }
    if (opts.skill !== undefined) {
      this.bridge.send(`setoption name Skill Level value ${opts.skill}`);
    }
    if (opts.maxError !== undefined) {
      this.bridge.send(`setoption name Skill Level Maximum Error value ${opts.maxError}`);
    }
  }

  private handleLine(line: string): void {
    // Handshake / synchronous waiter has priority.
    if (this.waitingFor && this.waitingFor(line)) {
      const cb = this.waitResolve;
      this.waitingFor = null;
      this.waitResolve = null;
      cb?.();
      return;
    }
    if (line.startsWith("bestmove ")) {
      // Stockfish emits "bestmove (none)" when there are no legal moves
      // (game already over). The string "(none)" is passed through as-is;
      // StockfishService's catch block falls back to a random legal move
      // (which will also be unavailable), which the caller treats as null.
      const move = line.split(" ")[1] ?? "";
      if (this.pending) {
        const p = this.pending;
        this.pending = null;
        p.resolve(move);
      }
    }
  }

  private waitFor(matcher: (line: string) => boolean, timeoutMs: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.waitingFor = null;
        this.waitResolve = null;
        reject(new Error("Handshake timeout"));
      }, timeoutMs);
      this.waitingFor = matcher;
      this.waitResolve = () => {
        clearTimeout(timeout);
        resolve();
      };
    });
  }
}

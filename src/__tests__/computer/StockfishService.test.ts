import { Chess } from "chess.js";
import { StockfishService, _resetStockfishServiceForTests } from "@/services/computer/StockfishService";
import { MinimaxEngine } from "@/services/computer/engine/MinimaxEngine";
import { UciEngine } from "@/services/computer/engine/types";
import { createRng } from "@/services/computer/engine/random";

/**
 * Returns a fixed move regardless of input. Used to isolate blunder-injection
 * behavior from engine-strength behavior in tests.
 */
class FixedMoveEngine implements UciEngine {
  constructor(private move: string) {}
  async initialize() {}
  async bestMove() { return this.move; }
  async dispose() {}
}

describe("StockfishService blunder injection", () => {
  it("never blunders at Tournament rating (blunderRate=0)", async () => {
    const rng = createRng(123);
    const service = new StockfishService(new FixedMoveEngine("e2e4"), rng);
    await service.initialize();

    const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    // At blunderRate=0 the service must always return the engine's chosen move.
    for (let i = 0; i < 20; i++) {
      const m = await service.getBestMove(fen, 1500);
      expect(m).toBe("e2e4");
    }
  });

  it("blunders ~40% of the time at Beginner rating", async () => {
    const rng = createRng(7);
    const service = new StockfishService(new MinimaxEngine(), rng);
    await service.initialize();

    const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const engineMove = await new MinimaxEngine().bestMove(fen, { movetimeMs: 200, skill: 0, maxError: 900 });

    let blunders = 0;
    const samples = 200;
    for (let i = 0; i < samples; i++) {
      const m = await service.getBestMove(fen, 800);
      if (m !== engineMove) blunders++;
    }

    // Expect roughly 40% blunder rate, allow generous tolerance.
    expect(blunders / samples).toBeGreaterThan(0.25);
    expect(blunders / samples).toBeLessThan(0.55);
  });

  it("returns a legal move even when blundering", async () => {
    const rng = createRng(99);
    const service = new StockfishService(new MinimaxEngine(), rng);
    await service.initialize();

    const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const chess = new Chess(fen);
    const legal = chess.moves({ verbose: true }).map((m) => m.from + m.to + (m.promotion ?? ""));

    for (let i = 0; i < 50; i++) {
      const m = await service.getBestMove(fen, 800);
      expect(legal).toContain(m);
    }
  });
});

describe("StockfishService initialization fallback", () => {
  beforeEach(() => _resetStockfishServiceForTests());

  it("falls back to MinimaxEngine when the supplied engine throws on initialize", async () => {
    const failing: any = {
      initialize: async () => { throw new Error("native missing"); },
      bestMove: async () => "should not be called",
      dispose: async () => {},
    };
    const service = new StockfishService(failing);
    await service.initialize();

    const move = await service.getBestMove(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      1200,
    );
    expect(move).toMatch(/^[a-h][1-8][a-h][1-8][qrbn]?$/);
  });
});

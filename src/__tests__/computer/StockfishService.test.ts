import { Chess } from "chess.js";
import { StockfishService } from "@/services/computer/StockfishService";
import { MinimaxEngine } from "@/services/computer/engine/MinimaxEngine";
import { createRng } from "@/services/computer/engine/random";

describe("StockfishService blunder injection", () => {
  it("never blunders at Tournament rating (blunderRate=0)", async () => {
    const rng = createRng(123);
    const service = new StockfishService(new MinimaxEngine(), rng);
    await service.initialize();

    const fen = "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1";
    const chess = new Chess(fen);
    const engineMove = await new MinimaxEngine().bestMove(fen, { movetimeMs: 200, uciElo: 1500 });

    // At blunderRate=0 the service must always return the engine's chosen move.
    for (let i = 0; i < 20; i++) {
      const m = await service.getBestMove(fen, 1500);
      expect(m).toBe(engineMove);
    }
    expect(chess).toBeDefined(); // silence unused
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

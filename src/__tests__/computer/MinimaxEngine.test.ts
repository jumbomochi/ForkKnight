import { Chess } from "chess.js";
import { MinimaxEngine } from "@/services/computer/engine/MinimaxEngine";

describe("MinimaxEngine", () => {
  let engine: MinimaxEngine;

  beforeEach(async () => {
    engine = new MinimaxEngine();
    await engine.initialize();
  });

  afterEach(async () => {
    await engine.dispose();
  });

  it("returns a legal move from the starting position", async () => {
    const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const move = await engine.bestMove(startFen, { movetimeMs: 200, uciElo: 1200 });

    expect(move).toMatch(/^[a-h][1-8][a-h][1-8][qrbn]?$/);
    const chess = new Chess(startFen);
    const legalUci = chess.moves({ verbose: true }).map((m) => m.from + m.to + (m.promotion ?? ""));
    expect(legalUci).toContain(move);
  });

  it("plays the only legal move when forced", async () => {
    // Black king on h8, white queen on g7 (check), white king on a1.
    // The queen on g7 is undefended. Only legal move: Kxg7.
    const fen = "7k/6Q1/8/8/8/8/8/K7 b - - 0 1";
    const move = await engine.bestMove(fen, { movetimeMs: 200, uciElo: 1500 });
    expect(move).toBe("h8g7");
  });

  it("finds mate in one", async () => {
    // White to move; Qxf7# is mate (Scholar's mate pattern on f7).
    const fen = "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1";
    // uciElo 1000 → depth 2, which is sufficient to find a 1-move mate.
    const move = await engine.bestMove(fen, { movetimeMs: 200, uciElo: 1000 });
    expect(move).toBe("h5f7");
  });
});

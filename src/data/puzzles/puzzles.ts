import type { Puzzle } from "@/types";

// Sample puzzles curated for children - beginner to intermediate level
// Based on Lichess puzzle database format
export const puzzles: Puzzle[] = [
  // Back Rank Mates - Rating 400-600
  {
    id: "puzzle-001",
    fen: "6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
    moves: ["a1a8"],
    rating: 400,
    themes: ["backRankMate", "mate", "mateIn1", "short"],
  },
  {
    id: "puzzle-002",
    fen: "6k1/5ppp/8/8/8/8/8/4RK2 w - - 0 1",
    moves: ["e1e8"],
    rating: 450,
    themes: ["backRankMate", "mate", "mateIn1"],
  },
  {
    id: "puzzle-003",
    fen: "6k1/5ppp/8/8/1Q6/8/8/4K3 w - - 0 1",
    moves: ["b4b8"],
    rating: 420,
    themes: ["backRankMate", "mate", "mateIn1"],
  },

  // Scholar's Mate Pattern - Rating 400-500
  {
    id: "puzzle-004",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
    moves: ["h5f7"],
    rating: 400,
    themes: ["mate", "mateIn1", "short"],
  },

  // Simple Forks - Rating 500-700
  {
    id: "puzzle-005",
    fen: "r3k3/8/8/8/8/5N2/8/4K3 w q - 0 1",
    moves: ["f3e5"],
    rating: 550,
    themes: ["fork", "short"],
  },
  {
    id: "puzzle-006",
    fen: "r3k3/8/8/3N4/8/8/8/4K3 w q - 0 1",
    moves: ["d5c7"],
    rating: 580,
    themes: ["fork", "knightFork", "short"],
  },
  {
    id: "puzzle-007",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    moves: ["f3g5"],
    rating: 620,
    themes: ["attackingF7", "hangingPiece", "threat"],
  },

  // Simple Pins - Rating 600-800
  {
    id: "puzzle-008",
    fen: "4k3/8/4n3/8/8/8/6B1/4K3 w - - 0 1",
    moves: ["g2c6"],
    rating: 650,
    themes: ["pin", "short"],
  },
  {
    id: "puzzle-009",
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 3",
    moves: ["f3g5"],
    rating: 700,
    themes: ["attackingF7", "threat"],
  },

  // Simple Skewers - Rating 650-800
  {
    id: "puzzle-010",
    fen: "3qk3/8/8/8/8/8/8/R3K3 w Q - 0 1",
    moves: ["a1a8"],
    rating: 680,
    themes: ["skewer", "short"],
  },
  {
    id: "puzzle-011",
    fen: "4k3/8/8/4q3/8/8/4R3/4K3 w - - 0 1",
    moves: ["e2e8", "e5e8", "e1e8"],
    rating: 720,
    themes: ["skewer", "materialGain"],
  },

  // Discovered Attacks - Rating 700-900
  {
    id: "puzzle-012",
    fen: "4k3/5q2/8/4N3/8/8/8/B3K3 w - - 0 1",
    moves: ["e5g6"],
    rating: 750,
    themes: ["discoveredAttack", "short"],
  },
  {
    id: "puzzle-013",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4",
    moves: ["f6e4"],
    rating: 800,
    themes: ["counterattack", "hangingPiece"],
  },

  // Knight Fork - Rating 800-1000
  {
    id: "puzzle-014",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    moves: ["e5f7"],
    rating: 850,
    themes: ["fork", "attackingF7", "short"],
  },

  // Two-Move Mates - Rating 600-900
  {
    id: "puzzle-015",
    fen: "k7/8/1K6/8/8/8/8/1R6 w - - 0 1",
    moves: ["b1a1"],
    rating: 600,
    themes: ["mate", "mateIn1", "rookEndgame"],
  },
  {
    id: "puzzle-016",
    fen: "4R1k1/6pp/8/8/8/5Q2/8/4K3 w - - 0 1",
    moves: ["f3f8"],
    rating: 550,
    themes: ["mate", "mateIn1"],
  },

  // Remove the Defender - Rating 800-1000
  {
    id: "puzzle-017",
    fen: "r4rk1/ppp2ppp/3p4/3Pn3/4P1b1/2N2N2/PPP2PPP/R1B1K2R w KQ - 0 1",
    moves: ["f3e5"],
    rating: 900,
    themes: ["removeTheDefender", "short"],
  },

  // Piece Coordination - Rating 700-900
  {
    id: "puzzle-018",
    fen: "r1bqkbnr/pppppppp/2n5/8/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    moves: ["f1b5"],
    rating: 750,
    themes: ["development", "pin"],
  },

  // Pawn Promotion Threats - Rating 900-1100
  {
    id: "puzzle-019",
    fen: "8/P7/8/8/8/8/8/k1K5 w - - 0 1",
    moves: ["a7a8q"],
    rating: 500,
    themes: ["promotion", "queening"],
  },
  {
    id: "puzzle-020",
    fen: "8/5P2/8/8/8/4k3/8/4K3 w - - 0 1",
    moves: ["f7f8q"],
    rating: 480,
    themes: ["promotion", "queening"],
  },

  // Simple Tactics Mix - Rating 600-1000
  {
    id: "puzzle-021",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    moves: ["c4f7"],
    rating: 650,
    themes: ["sacrifice", "attackingF7"],
  },
  {
    id: "puzzle-022",
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2",
    moves: ["d1h5"],
    rating: 550,
    themes: ["opening", "threat"],
  },
  {
    id: "puzzle-023",
    fen: "r1bqkbnr/pppppppp/2n5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2",
    moves: ["c6d4"],
    rating: 700,
    themes: ["center", "pawnGrab"],
  },
  {
    id: "puzzle-024",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5",
    moves: ["c1g5"],
    rating: 720,
    themes: ["pin", "development"],
  },
  {
    id: "puzzle-025",
    fen: "r2qkb1r/ppp1pppp/2n2n2/3p1b2/3P1B2/2N2N2/PPP1PPPP/R2QKB1R w KQkq - 4 5",
    moves: ["f3e5"],
    rating: 780,
    themes: ["fork", "center"],
  },

  // Multi-move Puzzles - Tactical sequences
  {
    id: "puzzle-026",
    fen: "6k1/5pp1/7p/8/8/8/5PPP/R5K1 w - - 0 1",
    moves: ["a1a8", "g8h7", "a8a7"],
    rating: 550,
    themes: ["rook", "activity", "attack"],
  },
  {
    id: "puzzle-027",
    fen: "r3k3/8/8/4N3/8/8/8/4K3 w q - 0 1",
    moves: ["e5c6", "e8d8", "c6a7"],
    rating: 600,
    themes: ["fork", "knightFork", "materialGain"],
  },
  {
    id: "puzzle-028",
    fen: "6k1/5p1p/6p1/8/8/6Q1/5PPP/R5K1 w - - 0 1",
    moves: ["a1a8", "g8g7", "g3g7"],
    rating: 650,
    themes: ["mateIn2", "backRankMate", "queenRookMate"],
  },
  {
    id: "puzzle-029",
    fen: "r1b1kb1r/pppp1ppp/2n2n2/4N3/2B1P2q/8/PPPP1PPP/RNBQK2R w KQkq - 0 1",
    moves: ["e5f7", "e8f7", "c4g8"],
    rating: 700,
    themes: ["sacrifice", "attackingF7", "materialGain"],
  },
  {
    id: "puzzle-030",
    fen: "r1bqkb1r/pppp1Npp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 1",
    moves: ["d8e7", "f7h8", "e7c5"],
    rating: 650,
    themes: ["fork", "defense", "materialGain"],
  },

  // Polgar 5334 - Mate in 1 (Section 1.1)
  {
    id: "polgar-001",
    fen: "3q1rk1/5pbp/5Qp1/8/8/2B5/5PPP/6K1 w - - 0 1",
    moves: ["f6f7"],
    rating: 500,
    themes: ["mate", "mateIn1", "queenMate"],
  },
  {
    id: "polgar-002",
    fen: "2r2rk1/2q2p1p/6pQ/4P1N1/8/8/PPP5/2KR4 w - - 0 1",
    moves: ["h6g7"],
    rating: 520,
    themes: ["mate", "mateIn1", "queenMate", "smotheredMate"],
  },
  {
    id: "polgar-003",
    fen: "r2q1rk1/pp1p1p1p/5PpQ/8/4N3/8/PP3PPP/R5K1 w - - 0 1",
    moves: ["h6g7"],
    rating: 540,
    themes: ["mate", "mateIn1", "queenMate"],
  },
  {
    id: "polgar-004",
    fen: "6r1/7k/2p1pPp1/3p4/8/1R6/5PPP/5K2 w - - 0 1",
    moves: ["b3h3"],
    rating: 560,
    themes: ["mate", "mateIn1", "rookMate", "backRankMate"],
  },
  {
    id: "polgar-005",
    fen: "1r4k1/1q3p2/5Bp1/8/8/8/PP6/1K5R w - - 0 1",
    moves: ["h1h8"],
    rating: 580,
    themes: ["mate", "mateIn1", "rookMate", "backRankMate"],
  },
  {
    id: "polgar-006",
    fen: "r4rk1/5p1p/8/8/8/8/1BP5/2KR4 w - - 0 1",
    moves: ["d1d8"],
    rating: 600,
    themes: ["mate", "mateIn1", "rookMate", "backRankMate"],
  },
];

export default puzzles;

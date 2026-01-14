import type { Puzzle } from "@/types";

// Sample puzzles curated for children - beginner to intermediate level
// Based on Lichess puzzle database format
export const puzzles: Puzzle[] = [
  // Back Rank Mates - Rating 400-600
  {
    id: "puzzle-001",
    fen: "6k1/5ppp/8/8/8/8/8/R3K3 w Q - 0 1",
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
    fen: "4k3/8/8/8/r7/8/3N4/4K3 w - - 0 1",
    moves: ["d2c4"],
    rating: 580,
    themes: ["fork", "short"],
  },
  {
    id: "puzzle-007",
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    moves: ["f3g5"],
    rating: 620,
    themes: ["fork", "hangingPiece"],
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
    themes: ["pin", "attackingF7"],
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
    fen: "4k3/4q3/8/8/8/8/4R3/4K3 w - - 0 1",
    moves: ["e2e7"],
    rating: 720,
    themes: ["skewer", "short"],
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
    themes: ["discoveredAttack", "fork"],
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
    fen: "6k1/6pp/8/8/8/5Q2/8/4K3 w - - 0 1",
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
    themes: ["fork", "center"],
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
];

export default puzzles;

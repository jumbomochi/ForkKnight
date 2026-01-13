import type { Lesson } from "@/types";

export const tacticsLessons: Lesson[] = [
  {
    id: "tactics-fork",
    title: "The Fork",
    description: "Attack two pieces at once with a single move!",
    category: "tactics",
    difficulty: "intermediate",
    prerequisites: ["piece-movement-knight"],
    steps: [
      {
        id: "fork-intro",
        type: "explanation",
        title: "What is a Fork?",
        content:
          "A fork is when one piece attacks TWO or more enemy pieces at the same time! The opponent can only save one, so you win material.",
        fen: "r3k3/8/8/4N3/8/8/8/4K3 w - - 0 1",
      },
      {
        id: "knight-fork",
        type: "explanation",
        title: "The Knight Fork",
        content:
          "Knights are the best at forking because they attack in unusual patterns. This Knight is about to fork the King and Rook!",
        fen: "r3k3/8/8/8/8/5N2/8/4K3 w - - 0 1",
      },
      {
        id: "knight-fork-demo",
        type: "demonstration",
        title: "Watch the Fork!",
        content: "See how the Knight jumps to attack both the King and Rook at once!",
        fen: "r3k3/8/8/8/8/5N2/8/4K3 w - - 0 1",
        moves: ["f3e5"],
      },
      {
        id: "royal-fork",
        type: "explanation",
        title: "The Royal Fork",
        content:
          "When a Knight forks the King and Queen, it's called a 'Royal Fork' - one of the most devastating tactics in chess!",
        fen: "4k3/8/8/3N4/8/8/8/4K2Q w - - 0 1",
      },
      {
        id: "fork-exercise-1",
        type: "exercise",
        title: "Find the Fork!",
        content: "Move your Knight to fork the black King and Rook.",
        fen: "4k3/8/8/8/r7/8/3N4/4K3 w - - 0 1",
        correctAnswer: "d2c4",
        hints: [
          "Look for a square where the Knight attacks both pieces",
          "The Knight needs to threaten both the King and Rook",
        ],
      },
      {
        id: "pawn-fork",
        type: "explanation",
        title: "Pawn Forks",
        content:
          "Even pawns can fork! Since pawns capture diagonally, they can attack two pieces at once.",
        fen: "8/8/2n1b3/3P4/8/8/8/4K3 w - - 0 1",
      },
      {
        id: "fork-exercise-2",
        type: "exercise",
        title: "Pawn Fork!",
        content: "Advance your pawn to fork the Knight and Bishop.",
        fen: "8/8/8/2n1b3/3P4/8/8/4K3 w - - 0 1",
        correctAnswer: "d4d5",
        hints: [
          "Pawns capture diagonally",
          "Find a square where the pawn threatens both pieces",
        ],
      },
      {
        id: "fork-quiz",
        type: "quiz",
        title: "Fork Quiz",
        content: "Which piece is especially good at forking?",
        options: [
          { id: "a", text: "The Rook", isCorrect: false },
          { id: "b", text: "The Knight", isCorrect: true },
          { id: "c", text: "The King", isCorrect: false },
          { id: "d", text: "The Pawn", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "tactics-pin",
    title: "The Pin",
    description: "Freeze your opponent's pieces in place!",
    category: "tactics",
    difficulty: "intermediate",
    prerequisites: ["piece-movement-bishop", "piece-movement-rook"],
    steps: [
      {
        id: "pin-intro",
        type: "explanation",
        title: "What is a Pin?",
        content:
          "A pin is when a piece cannot move (or shouldn't move) because it would expose a more valuable piece behind it to attack.",
        fen: "4k3/4r3/8/4B3/8/8/8/4K3 w - - 0 1",
      },
      {
        id: "absolute-pin",
        type: "explanation",
        title: "Absolute Pin",
        content:
          "When a piece is pinned to the King, it's called an 'absolute pin' - the piece literally cannot move because it would leave the King in check!",
        fen: "4k3/4n3/8/8/8/8/4R3/4K3 w - - 0 1",
      },
      {
        id: "relative-pin",
        type: "explanation",
        title: "Relative Pin",
        content:
          "When a piece is pinned to the Queen or another valuable piece, it's a 'relative pin' - it CAN move, but probably shouldn't!",
        fen: "4k3/4q3/4n3/8/8/8/4R3/4K3 w - - 0 1",
      },
      {
        id: "pin-exercise",
        type: "exercise",
        title: "Create a Pin!",
        content: "Move your Bishop to pin the Knight to the King.",
        fen: "4k3/8/4n3/8/8/8/6B1/4K3 w - - 0 1",
        correctAnswer: "g2c6",
        hints: [
          "Bishops move diagonally",
          "Line up your Bishop with the Knight and King",
        ],
      },
      {
        id: "pin-attack",
        type: "explanation",
        title: "Attacking a Pinned Piece",
        content:
          "Once a piece is pinned, you can often win it by attacking it with another piece - it can't run away!",
        fen: "4k3/4n3/8/8/8/4P3/4R3/4K3 w - - 0 1",
      },
      {
        id: "pin-quiz",
        type: "quiz",
        title: "Pin Quiz",
        content: "What is the difference between an absolute pin and a relative pin?",
        options: [
          {
            id: "a",
            text: "Absolute pins are against the King, relative pins are against other pieces",
            isCorrect: true,
          },
          { id: "b", text: "They are the same thing", isCorrect: false },
          { id: "c", text: "Absolute pins can be broken, relative pins cannot", isCorrect: false },
          { id: "d", text: "Only Knights can create absolute pins", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "tactics-skewer",
    title: "The Skewer",
    description: "Attack a valuable piece and win what's behind it!",
    category: "tactics",
    difficulty: "intermediate",
    prerequisites: ["tactics-pin"],
    steps: [
      {
        id: "skewer-intro",
        type: "explanation",
        title: "What is a Skewer?",
        content:
          "A skewer is like a reverse pin! You attack a valuable piece, and when it moves, you capture the piece behind it.",
        fen: "4k3/8/8/8/8/4R3/8/4K3 w - - 0 1",
      },
      {
        id: "skewer-demo",
        type: "demonstration",
        title: "Skewer in Action",
        content:
          "Watch: the Rook attacks the King. When the King moves, the Rook captures the Queen!",
        fen: "4k2q/8/8/8/8/8/8/R3K3 w - - 0 1",
        moves: ["a1a8"],
      },
      {
        id: "skewer-vs-pin",
        type: "explanation",
        title: "Skewer vs Pin",
        content:
          "In a PIN, the less valuable piece is in front. In a SKEWER, the more valuable piece is in front and must move!",
        fen: "4k3/8/8/4q3/8/8/4B3/4K3 w - - 0 1",
      },
      {
        id: "skewer-exercise",
        type: "exercise",
        title: "Find the Skewer!",
        content: "Move your Rook to skewer the King and win the Queen.",
        fen: "3qk3/8/8/8/8/8/8/R3K3 w - - 0 1",
        correctAnswer: "a1a8",
        hints: [
          "Line up your Rook with the King and Queen",
          "Attack the King first - the Queen is behind it",
        ],
      },
      {
        id: "skewer-quiz",
        type: "quiz",
        title: "Skewer Quiz",
        content: "In a skewer, which piece is attacked first?",
        options: [
          { id: "a", text: "The less valuable piece", isCorrect: false },
          { id: "b", text: "The more valuable piece", isCorrect: true },
          { id: "c", text: "Always the King", isCorrect: false },
          { id: "d", text: "It doesn't matter", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "tactics-discovered-attack",
    title: "Discovered Attack",
    description: "Unleash a hidden attack by moving another piece!",
    category: "tactics",
    difficulty: "intermediate",
    steps: [
      {
        id: "discovered-intro",
        type: "explanation",
        title: "The Hidden Threat",
        content:
          "A discovered attack happens when you move one piece and reveal an attack from another piece behind it. Surprise!",
        fen: "4k3/8/8/3Nr3/8/8/8/4K2R w - - 0 1",
      },
      {
        id: "discovered-demo",
        type: "demonstration",
        title: "Watch the Discovery!",
        content:
          "The Knight moves AND reveals the Rook's attack on the enemy Rook. Two threats in one move!",
        fen: "4k3/8/8/3Nr3/8/8/8/4K2R w - - 0 1",
        moves: ["d5f6"],
      },
      {
        id: "discovered-check",
        type: "explanation",
        title: "Discovered Check",
        content:
          "When the discovered attack is a check on the King, it's extra powerful because the King MUST move, giving you a free attack!",
        fen: "4k3/8/8/3Nr3/8/8/8/4K2R w - - 0 1",
      },
      {
        id: "discovered-exercise",
        type: "exercise",
        title: "Find the Discovery!",
        content: "Move the Knight to create a discovered attack on the Queen with your Bishop.",
        fen: "4k3/4q3/8/4N3/8/8/8/B3K3 w - - 0 1",
        correctAnswer: "e5g6",
        hints: [
          "Move the Knight out of the way",
          "The Bishop will then attack the Queen",
        ],
      },
      {
        id: "discovered-quiz",
        type: "quiz",
        title: "Discovered Attack Quiz",
        content: "What makes a discovered attack so powerful?",
        options: [
          { id: "a", text: "It uses two pieces to attack", isCorrect: false },
          {
            id: "b",
            text: "The moving piece can also create a threat while revealing the hidden attack",
            isCorrect: true,
          },
          { id: "c", text: "It always wins the Queen", isCorrect: false },
          { id: "d", text: "It cannot be defended", isCorrect: false },
        ],
      },
    ],
  },
];

export default tacticsLessons;

import type { Lesson } from "@/types";

export const beginnerLessons: Lesson[] = [
  {
    id: "piece-movement-pawn",
    title: "The Pawn",
    description: "Learn how the smallest piece on the board moves and captures",
    category: "basics",
    difficulty: "beginner",
    steps: [
      {
        id: "pawn-intro",
        type: "explanation",
        title: "Meet the Pawn",
        content:
          "Pawns are the smallest pieces on the board, but don't underestimate them! You start with 8 pawns, and they can become very powerful.",
        fen: "8/8/8/8/8/8/PPPPPPPP/8 w - - 0 1",
      },
      {
        id: "pawn-move-1",
        type: "explanation",
        title: "Moving Forward",
        content:
          "Pawns move straight forward, one square at a time. They can never move backward!",
        fen: "8/8/8/8/4P3/8/8/8 w - - 0 1",
      },
      {
        id: "pawn-move-2",
        type: "explanation",
        title: "First Move Special",
        content:
          "On a pawn's very first move, it can choose to move forward TWO squares instead of one. This is optional!",
        fen: "8/8/8/8/8/8/4P3/8 w - - 0 1",
        moves: ["e2e4"],
      },
      {
        id: "pawn-capture",
        type: "explanation",
        title: "Capturing Diagonally",
        content:
          "Here's the tricky part: pawns capture differently than they move! They capture diagonally, one square forward.",
        fen: "8/8/8/3p4/4P3/8/8/8 w - - 0 1",
      },
      {
        id: "pawn-exercise-1",
        type: "exercise",
        title: "Your Turn!",
        content: "Capture the black pawn with your white pawn.",
        fen: "8/8/8/3p4/4P3/8/8/8 w - - 0 1",
        correctAnswer: "e4d5",
        hints: ["Pawns capture diagonally", "Move your pawn to where the black pawn is"],
      },
      {
        id: "pawn-promotion",
        type: "explanation",
        title: "Pawn Promotion",
        content:
          "When a pawn reaches the other side of the board, something magical happens - it transforms into a Queen, Rook, Bishop, or Knight! Usually, we pick Queen.",
        fen: "8/4P3/8/8/8/8/8/8 w - - 0 1",
      },
      {
        id: "pawn-quiz",
        type: "quiz",
        title: "Pawn Quiz",
        content: "How do pawns capture enemy pieces?",
        options: [
          { id: "a", text: "Straight forward", isCorrect: false },
          { id: "b", text: "Diagonally forward", isCorrect: true },
          { id: "c", text: "In any direction", isCorrect: false },
          { id: "d", text: "Backward only", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "piece-movement-knight",
    title: "The Knight",
    description: "Master the tricky L-shaped jump of the Knight",
    category: "basics",
    difficulty: "beginner",
    steps: [
      {
        id: "knight-intro",
        type: "explanation",
        title: "The Jumping Horse",
        content:
          "The Knight looks like a horse and is the most unique piece! It's the only piece that can jump over other pieces.",
        fen: "8/8/8/8/4N3/8/8/8 w - - 0 1",
      },
      {
        id: "knight-move",
        type: "explanation",
        title: "The L-Shape",
        content:
          "Knights move in an 'L' shape: two squares in one direction, then one square to the side. Think of it as: 2 + 1 = Jump!",
        fen: "8/8/8/8/4N3/8/8/8 w - - 0 1",
      },
      {
        id: "knight-squares",
        type: "demonstration",
        title: "Where Can It Go?",
        content:
          "From the center of the board, a Knight can reach up to 8 different squares! Watch all the places this Knight can jump to.",
        fen: "8/8/2N5/8/8/8/8/8 w - - 0 1",
      },
      {
        id: "knight-jump",
        type: "explanation",
        title: "Jumping Over Pieces",
        content:
          "Unlike other pieces, the Knight can jump over pieces in its way. This makes it very sneaky!",
        fen: "8/8/2ppp3/2pNp3/2ppp3/8/8/8 w - - 0 1",
      },
      {
        id: "knight-exercise",
        type: "exercise",
        title: "Knight Jump!",
        content: "Move the Knight to capture the black pawn.",
        fen: "8/8/5p2/8/4N3/8/8/8 w - - 0 1",
        correctAnswer: "e4f6",
        hints: [
          "Remember: 2 squares + 1 square to the side",
          "The Knight needs to land on the pawn's square",
        ],
      },
      {
        id: "knight-quiz",
        type: "quiz",
        title: "Knight Quiz",
        content: "What makes the Knight special compared to other pieces?",
        options: [
          { id: "a", text: "It's the strongest piece", isCorrect: false },
          { id: "b", text: "It can jump over other pieces", isCorrect: true },
          { id: "c", text: "It can move anywhere", isCorrect: false },
          { id: "d", text: "It can capture multiple pieces at once", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "piece-movement-bishop",
    title: "The Bishop",
    description: "Learn how the Bishop slides diagonally across the board",
    category: "basics",
    difficulty: "beginner",
    steps: [
      {
        id: "bishop-intro",
        type: "explanation",
        title: "The Diagonal Slider",
        content:
          "The Bishop moves diagonally, as many squares as it wants! Each player has two Bishops - one on light squares, one on dark squares.",
        fen: "8/8/8/8/4B3/8/8/8 w - - 0 1",
      },
      {
        id: "bishop-color",
        type: "explanation",
        title: "Stuck on One Color",
        content:
          "A Bishop always stays on the same color squares. If it starts on a white square, it can never reach a black square!",
        fen: "8/8/8/8/3B4/8/8/8 w - - 0 1",
      },
      {
        id: "bishop-range",
        type: "demonstration",
        title: "Long Range Power",
        content:
          "From the center, a Bishop can control many squares across the board. It's great for attacking from far away!",
        fen: "8/8/8/8/4B3/8/8/8 w - - 0 1",
      },
      {
        id: "bishop-blocked",
        type: "explanation",
        title: "Blocked by Pieces",
        content:
          "Unlike the Knight, Bishops cannot jump over pieces. If something is in the way, the Bishop must stop.",
        fen: "8/8/6p1/8/4B3/8/8/8 w - - 0 1",
      },
      {
        id: "bishop-exercise",
        type: "exercise",
        title: "Capture the Pawn!",
        content: "Use your Bishop to capture the black pawn diagonally.",
        fen: "8/8/6p1/8/4B3/8/8/8 w - - 0 1",
        correctAnswer: "e4g6",
        hints: ["Bishops move diagonally", "Slide to where the pawn is"],
      },
      {
        id: "bishop-quiz",
        type: "quiz",
        title: "Bishop Quiz",
        content: "If a Bishop starts on a light square, what squares can it visit?",
        options: [
          { id: "a", text: "Only light squares", isCorrect: true },
          { id: "b", text: "Only dark squares", isCorrect: false },
          { id: "c", text: "Both light and dark squares", isCorrect: false },
          { id: "d", text: "It depends on other pieces", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "piece-movement-rook",
    title: "The Rook",
    description: "Discover the power of the straight-moving Rook",
    category: "basics",
    difficulty: "beginner",
    steps: [
      {
        id: "rook-intro",
        type: "explanation",
        title: "The Castle Tower",
        content:
          "The Rook looks like a castle tower and is one of the strongest pieces! It moves in straight lines - up, down, left, or right.",
        fen: "8/8/8/8/4R3/8/8/8 w - - 0 1",
      },
      {
        id: "rook-movement",
        type: "explanation",
        title: "Straight Lines Only",
        content:
          "Rooks can move as many squares as they want, but only in straight lines. They cannot move diagonally.",
        fen: "8/8/8/8/4R3/8/8/8 w - - 0 1",
      },
      {
        id: "rook-power",
        type: "demonstration",
        title: "Controlling Ranks and Files",
        content:
          "A Rook in the open can control an entire row (rank) and column (file) of the board!",
        fen: "8/8/8/8/R7/8/8/8 w - - 0 1",
      },
      {
        id: "rook-exercise",
        type: "exercise",
        title: "Rook Capture!",
        content: "Move the Rook to capture the black pawn.",
        fen: "8/4p3/8/8/4R3/8/8/8 w - - 0 1",
        correctAnswer: "e4e7",
        hints: ["Rooks move in straight lines", "Move up to capture the pawn"],
      },
      {
        id: "rook-quiz",
        type: "quiz",
        title: "Rook Quiz",
        content: "How does the Rook move?",
        options: [
          { id: "a", text: "Diagonally only", isCorrect: false },
          { id: "b", text: "In an L-shape", isCorrect: false },
          { id: "c", text: "In straight lines (horizontal and vertical)", isCorrect: true },
          { id: "d", text: "One square in any direction", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "piece-movement-queen",
    title: "The Queen",
    description: "Meet the most powerful piece on the board",
    category: "basics",
    difficulty: "beginner",
    steps: [
      {
        id: "queen-intro",
        type: "explanation",
        title: "The Mighty Queen",
        content:
          "The Queen is the most powerful piece! She can move like a Rook AND a Bishop combined - straight lines AND diagonals!",
        fen: "8/8/8/8/4Q3/8/8/8 w - - 0 1",
      },
      {
        id: "queen-movement",
        type: "demonstration",
        title: "Unlimited Power",
        content:
          "The Queen can reach so many squares from the center of the board. She's worth protecting!",
        fen: "8/8/8/8/4Q3/8/8/8 w - - 0 1",
      },
      {
        id: "queen-value",
        type: "explanation",
        title: "Protect Your Queen",
        content:
          "Because the Queen is so powerful, losing her is usually very bad. Be careful not to put her in danger!",
        fen: "8/8/8/8/4Q3/8/8/8 w - - 0 1",
      },
      {
        id: "queen-exercise",
        type: "exercise",
        title: "Queen Attack!",
        content: "Capture the black pawn with your Queen.",
        fen: "8/8/8/7p/4Q3/8/8/8 w - - 0 1",
        correctAnswer: "e4h4",
        hints: ["The Queen can move like a Rook (straight)", "Move right to capture"],
      },
      {
        id: "queen-quiz",
        type: "quiz",
        title: "Queen Quiz",
        content: "The Queen combines the movement of which two pieces?",
        options: [
          { id: "a", text: "Knight and Pawn", isCorrect: false },
          { id: "b", text: "Rook and Bishop", isCorrect: true },
          { id: "c", text: "King and Knight", isCorrect: false },
          { id: "d", text: "Bishop and Knight", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "piece-movement-king",
    title: "The King",
    description: "Understand the most important piece in chess",
    category: "basics",
    difficulty: "beginner",
    steps: [
      {
        id: "king-intro",
        type: "explanation",
        title: "The Most Important Piece",
        content:
          "The King is the most important piece! If your King is trapped (checkmate), you lose the game. Protect your King at all costs!",
        fen: "8/8/8/8/4K3/8/8/8 w - - 0 1",
      },
      {
        id: "king-movement",
        type: "explanation",
        title: "One Square at a Time",
        content:
          "The King can move in any direction, but only one square at a time. He's important but not very fast!",
        fen: "8/8/8/8/4K3/8/8/8 w - - 0 1",
      },
      {
        id: "king-safety",
        type: "explanation",
        title: "Stay Safe!",
        content:
          "The King can never move to a square where he would be attacked. That would be putting himself in 'check'!",
        fen: "8/8/8/8/4K3/8/4r3/8 w - - 0 1",
      },
      {
        id: "king-exercise",
        type: "exercise",
        title: "King Move",
        content: "Move your King one square to capture the pawn.",
        fen: "8/8/8/4p3/4K3/8/8/8 w - - 0 1",
        correctAnswer: "e4e5",
        hints: ["The King moves one square at a time", "Move up to capture the pawn"],
      },
      {
        id: "king-quiz",
        type: "quiz",
        title: "King Quiz",
        content: "What happens if your King is checkmated?",
        options: [
          { id: "a", text: "Nothing, keep playing", isCorrect: false },
          { id: "b", text: "You lose the game", isCorrect: true },
          { id: "c", text: "You get a new King", isCorrect: false },
          { id: "d", text: "The game is a draw", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "check-and-checkmate",
    title: "Check and Checkmate",
    description: "Learn how to win a chess game!",
    category: "basics",
    difficulty: "beginner",
    steps: [
      {
        id: "check-intro",
        type: "explanation",
        title: "What is Check?",
        content:
          "When a piece attacks the enemy King, we say the King is 'in check'. The King MUST escape from check on the next move!",
        fen: "4k3/8/8/8/8/8/8/4R3 w - - 0 1",
      },
      {
        id: "check-escape",
        type: "explanation",
        title: "Three Ways to Escape Check",
        content:
          "When in check, you can: 1) Move the King away, 2) Block the attack with another piece, or 3) Capture the attacking piece.",
        fen: "4k3/8/8/8/8/8/8/4R3 b - - 0 1",
      },
      {
        id: "checkmate-intro",
        type: "explanation",
        title: "What is Checkmate?",
        content:
          "Checkmate is when the King is in check AND has no way to escape! This ends the game - you win!",
        fen: "4k3/4R3/4K3/8/8/8/8/8 b - - 0 1",
      },
      {
        id: "back-rank-mate",
        type: "demonstration",
        title: "Back Rank Checkmate",
        content:
          "Here's a famous checkmate pattern: the Rook delivers checkmate on the back rank because the King can't escape!",
        fen: "6k1/5ppp/8/8/8/8/8/R7 w - - 0 1",
        moves: ["a1a8"],
      },
      {
        id: "checkmate-exercise",
        type: "exercise",
        title: "Deliver Checkmate!",
        content: "Move your Rook to checkmate the black King.",
        fen: "6k1/5ppp/8/8/8/8/8/R7 w - - 0 1",
        correctAnswer: "a1a8",
        hints: [
          "Look for a move that attacks the King",
          "The King is trapped by his own pawns",
        ],
      },
      {
        id: "checkmate-quiz",
        type: "quiz",
        title: "Checkmate Quiz",
        content: "What is the difference between check and checkmate?",
        options: [
          { id: "a", text: "They are the same thing", isCorrect: false },
          { id: "b", text: "Check can be escaped, checkmate cannot", isCorrect: true },
          { id: "c", text: "Checkmate can be escaped, check cannot", isCorrect: false },
          { id: "d", text: "Check ends the game", isCorrect: false },
        ],
      },
    ],
  },
];

export default beginnerLessons;

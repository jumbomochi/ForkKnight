import type { Lesson } from "@/types";

export const endgameLessons: Lesson[] = [
  {
    id: "endgame-kq-vs-k",
    title: "King & Queen vs King",
    description: "Learn the staircase method to deliver checkmate with King and Queen!",
    category: "endgames",
    difficulty: "intermediate",
    steps: [
      {
        id: "kqk-intro",
        type: "explanation",
        title: "King and Queen vs King",
        content:
          "When you have a King and Queen against a lone King, you can always win — but you have to be careful! The most common mistake is accidentally causing a stalemate, which means a draw. Let's learn the right way to do it!",
        fen: "8/8/8/4k3/8/8/8/4KQ2 w - - 0 1",
      },
      {
        id: "kqk-staircase",
        type: "explanation",
        title: "The Staircase Method",
        content:
          "The easiest way to checkmate with a Queen is called the staircase method. Use your Queen to cut off the enemy King step by step, pushing it toward the edge of the board. The Queen makes a 'staircase' pattern as the King gets closer and closer to the corner!",
        fen: "8/8/8/4k3/8/4Q3/8/4K3 w - - 0 1",
      },
      {
        id: "kqk-stalemate-warning",
        type: "explanation",
        title: "Watch Out for Stalemate!",
        content:
          "Stalemate happens when the opponent's King has NO legal moves but is NOT in check — and that means a draw! Be careful not to give the enemy King no moves unless it is already in checkmate. Always check if the King has somewhere to go before moving your Queen close.",
        fen: "Q7/8/2k5/8/8/8/8/7K b - - 0 1",
      },
      {
        id: "kqk-demo",
        type: "demonstration",
        title: "Delivering Checkmate",
        content:
          "Watch how the Queen and King work together to force checkmate! The King comes forward to help box in the enemy King, and then the Queen delivers the final blow.",
        fen: "8/8/8/8/8/2k5/8/KQ6 w - - 0 1",
        moves: ["b1b6", "c3d4", "b6b4", "d4c3", "a1a2", "c3d3", "b4d4"],
      },
      {
        id: "kqk-exercise",
        type: "exercise",
        title: "Push the King to the Edge!",
        content:
          "The enemy King is in the middle. Move your Queen to start pushing it toward the edge of the board. Use the staircase — cut off the King's escape squares!",
        fen: "8/8/8/4k3/8/8/8/KQ6 w - - 0 1",
        correctAnswer: "b1e4",
        hints: [
          "Move the Queen to cut off the enemy King's escape squares",
          "Put the Queen on e4 to start pushing the King toward the top of the board",
        ],
      },
      {
        id: "kqk-quiz",
        type: "quiz",
        title: "Queen Endgame Quiz",
        content: "What is stalemate, and why should you avoid it when you have a Queen and King?",
        options: [
          {
            id: "a",
            text: "Stalemate is checkmate — it means you win!",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Stalemate is when the enemy King has no moves and is NOT in check — it's a draw!",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Stalemate happens when both Kings are on the same file",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Stalemate only happens in pawn endgames",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: "endgame-kr-vs-k",
    title: "King & Rook vs King",
    description: "Use the box method to cut off the enemy King and force checkmate!",
    category: "endgames",
    difficulty: "intermediate",
    steps: [
      {
        id: "krk-intro",
        type: "explanation",
        title: "King and Rook vs King",
        content:
          "King and Rook vs a lone King is another winning endgame! It is a little harder than using a Queen, but with the right method you will always win. The secret is called the box method.",
        fen: "8/8/8/4k3/8/8/8/R3K3 w - - 0 1",
      },
      {
        id: "krk-box-method",
        type: "explanation",
        title: "The Box Method",
        content:
          "Imagine the enemy King is trapped inside a box. Your Rook draws a line that the enemy King cannot cross. Then you shrink the box smaller and smaller until the King is forced to the edge of the board. Your own King helps push the enemy King toward the corner!",
        fen: "8/8/8/4k3/8/8/8/R3K3 w - - 0 1",
      },
      {
        id: "krk-cut-off",
        type: "explanation",
        title: "Cut Off the King",
        content:
          "Place your Rook on a rank or file to cut off the enemy King. The King cannot cross that line! For example, if your Rook is on the 5th rank, the enemy King cannot move below rank 5. Now bring your King forward to help squeeze the box even tighter.",
        fen: "8/8/8/R7/4k3/8/8/4K3 w - - 0 1",
      },
      {
        id: "krk-demo",
        type: "demonstration",
        title: "Shrinking the Box",
        content:
          "Watch how the Rook cuts off the enemy King and the King marches forward to shrink the box step by step until checkmate!",
        fen: "8/8/8/8/4k3/8/8/R3K3 w - - 0 1",
        moves: ["a1a5", "e4d4", "e1f2", "d4c4", "f2e3", "c4b4", "a5b5"],
      },
      {
        id: "krk-exercise",
        type: "exercise",
        title: "Cut Off the Enemy King!",
        content:
          "The enemy King is in the middle of the board. Move your Rook to cut off the King and start shrinking the box!",
        fen: "8/8/8/8/4k3/8/8/R3K3 w - - 0 1",
        correctAnswer: "a1a5",
        hints: [
          "Use the Rook to cut off the enemy King on a rank",
          "Place the Rook on the 5th rank so the King cannot go below it",
        ],
      },
      {
        id: "krk-quiz",
        type: "quiz",
        title: "Rook Endgame Quiz",
        content: "What is the goal of the box method when using a King and Rook?",
        options: [
          {
            id: "a",
            text: "Move the Rook to every square as fast as possible",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Use the Rook to cut off the enemy King and shrink the box until the King is on the edge",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Trade the Rook for the enemy King",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Keep the Rook in the corner at all times",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: "endgame-pawn-basics",
    title: "Pawn Endgames — The Basics",
    description: "Learn King and Pawn vs King and the key idea of opposition!",
    category: "endgames",
    difficulty: "intermediate",
    steps: [
      {
        id: "pawn-intro",
        type: "explanation",
        title: "King and Pawn Endgames",
        content:
          "Pawn endgames are very common and very important! Even a single extra pawn can decide the whole game. The most important thing to learn is how the Kings fight for control — this is called opposition.",
        fen: "8/8/8/8/8/4k3/4P3/4K3 w - - 0 1",
      },
      {
        id: "pawn-promotion-goal",
        type: "explanation",
        title: "The Goal: Promote the Pawn!",
        content:
          "When you have a pawn left, your goal is to march it all the way to the other end of the board and turn it into a Queen! But the enemy King will try to block it. Your King must escort the pawn safely past the enemy King.",
        fen: "8/8/8/8/8/4k3/4P3/4K3 w - - 0 1",
      },
      {
        id: "pawn-opposition",
        type: "explanation",
        title: "The Opposition",
        content:
          "Opposition is when two Kings face each other with exactly ONE square between them. The player who does NOT have to move has the opposition — and that is a big advantage! If you have the opposition, you push the enemy King back and make way for your pawn.",
        fen: "8/8/8/3k4/8/3K4/8/8 w - - 0 1",
      },
      {
        id: "pawn-opposition-demo",
        type: "demonstration",
        title: "Using the Opposition",
        content:
          "Watch how White uses the opposition to push the Black King away and escort the pawn to promotion!",
        fen: "8/8/8/8/3k4/8/3PK3/8 w - - 0 1",
        moves: ["e2e3", "d4e5", "e3d3", "e5d5", "d2d4", "d5e5", "d3e3"],
      },
      {
        id: "pawn-exercise",
        type: "exercise",
        title: "Grab the Opposition!",
        content:
          "The two Kings are facing each other. Move your King to take the opposition — put one square between the Kings so it is Black's turn to move!",
        fen: "8/8/8/8/3k4/8/3K4/8 w - - 0 1",
        correctAnswer: "d2d3",
        hints: [
          "Opposition means the Kings are on the same file or rank with one square between them",
          "Move your King one step closer to the enemy King",
        ],
      },
      {
        id: "pawn-quiz",
        type: "quiz",
        title: "Pawn Endgame Quiz",
        content: "What is opposition in a pawn endgame?",
        options: [
          {
            id: "a",
            text: "When your pawn is blocking the enemy pawn",
            isCorrect: false,
          },
          {
            id: "b",
            text: "When two Kings face each other with one square between them and it is the other player's turn to move",
            isCorrect: true,
          },
          {
            id: "c",
            text: "When both Kings are in the same corner",
            isCorrect: false,
          },
          {
            id: "d",
            text: "When a pawn reaches the other side of the board",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: "endgame-passed-pawns",
    title: "Pawn Endgames — Passed Pawns",
    description: "Master passed pawns, outside passed pawns, and the square rule!",
    category: "endgames",
    difficulty: "intermediate",
    steps: [
      {
        id: "passed-intro",
        type: "explanation",
        title: "What is a Passed Pawn?",
        content:
          "A passed pawn is a pawn that has NO enemy pawns in front of it or on the files next to it. Nobody can stop it from promoting except the enemy King! Passed pawns are very powerful — they are called 'candidates for promotion.'",
        fen: "8/8/8/8/8/2k5/2P5/2K5 w - - 0 1",
      },
      {
        id: "passed-outside",
        type: "explanation",
        title: "The Outside Passed Pawn",
        content:
          "An outside passed pawn is a passed pawn far away from the other pawns. It is a secret weapon! You advance it to lure the enemy King away from the main battle. While the enemy King chases your pawn on one side, your King runs to win the pawns on the other side!",
        fen: "8/8/5k2/P6p/8/8/8/3K4 w - - 0 1",
      },
      {
        id: "passed-outside-demo",
        type: "demonstration",
        title: "Outside Passed Pawn in Action",
        content:
          "Watch how the outside passed pawn on the a-file pulls the enemy King away, letting White's King capture the h5 pawn!",
        fen: "8/8/5k2/P6p/8/8/8/3K4 w - - 0 1",
        moves: ["a5a6", "f6e6", "d1e2", "e6d6", "a6a7", "d6c7", "e2f3"],
      },
      {
        id: "passed-square-rule",
        type: "explanation",
        title: "The Square Rule",
        content:
          "The square rule (also called the 'rule of the square') tells you if a King can catch a pawn racing to promote. Draw a square from the pawn to the promotion square. If the enemy King can step inside that square, it catches the pawn. If not, the pawn promotes! You can calculate this in your head without counting every square.",
        fen: "8/8/8/8/6p1/8/8/K7 b - - 0 1",
      },
      {
        id: "passed-exercise",
        type: "exercise",
        title: "Advance the Passed Pawn!",
        content:
          "You have a passed pawn on c2. The enemy King is far away. Push your pawn forward to begin its march to promotion!",
        fen: "8/8/8/8/8/2k5/2P5/2K5 w - - 0 1",
        correctAnswer: "c1b1",
        hints: [
          "First, use your King to help escort the pawn",
          "Move your King away from the pawn's path so the pawn can advance freely",
        ],
      },
      {
        id: "passed-quiz",
        type: "quiz",
        title: "Passed Pawn Quiz",
        content: "What is the square rule used for?",
        options: [
          {
            id: "a",
            text: "To count how many squares a Rook can move",
            isCorrect: false,
          },
          {
            id: "b",
            text: "To quickly decide if an enemy King can catch a passed pawn before it promotes",
            isCorrect: true,
          },
          {
            id: "c",
            text: "To find the best square for your Queen",
            isCorrect: false,
          },
          {
            id: "d",
            text: "To decide which pawn to advance first in the opening",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: "endgame-rook-endgames",
    title: "Rook Endgames",
    description: "Master the Lucena and Philidor positions — the most important rook endgames!",
    category: "endgames",
    difficulty: "intermediate",
    steps: [
      {
        id: "rook-intro",
        type: "explanation",
        title: "Rook Endgames Are Everywhere!",
        content:
          "Rook endgames are the most common endgames in chess. Even grandmasters study them their whole lives! There are two positions that every chess player must know: the Lucena position (how to win) and the Philidor position (how to draw). Let's learn them both!",
        fen: "1K1R4/1P6/8/8/8/8/r7/2k5 w - - 0 1",
      },
      {
        id: "rook-lucena",
        type: "explanation",
        title: "The Lucena Position — Building a Bridge",
        content:
          "The Lucena position is the key winning position in rook endgames. White's pawn is one step from queening, and the White King is on the promotion square. To win, White uses a trick called 'building a bridge.' The Rook cuts off the enemy King, then shelters its own King from checks so the pawn can promote!",
        fen: "1K1R4/1P6/8/8/8/8/r7/2k5 w - - 0 1",
      },
      {
        id: "rook-lucena-demo",
        type: "demonstration",
        title: "Building the Bridge",
        content:
          "Watch how White builds a bridge: the Rook moves to cut off the enemy King from checks, then shelters the White King so the pawn promotes to a Queen!",
        fen: "1K1R4/1P6/8/8/8/8/r7/2k5 w - - 0 1",
        moves: ["d8d4", "a2a1", "b8c7", "a1c1", "c7d6", "c1d1", "d6e5", "d1e1", "e5d6", "e1d1", "d4d1"],
      },
      {
        id: "rook-philidor",
        type: "explanation",
        title: "The Philidor Position — The Drawing Defense",
        content:
          "The Philidor position is the defender's best drawing method in rook endgames. The key idea is to place your Rook on the 6th rank (or 3rd rank if you are Black) to stop the enemy King from advancing. When the pawn advances, shift your Rook behind it to give checks from behind. With correct play, you can always draw this position!",
        fen: "8/8/8/1k6/1p6/8/1r6/3RK3 b - - 0 1",
      },
      {
        id: "rook-philidor-key",
        type: "explanation",
        title: "Philidor Key Idea",
        content:
          "Remember the two steps of the Philidor defense: First, put your Rook on the 6th rank (the Philidor position) to stop the enemy King. Second, when the enemy pawn moves forward, switch your Rook to the back rank and give endless checks from behind the pawn. The enemy King can never escape the checks!",
        fen: "8/8/1r6/1k6/1p6/8/8/3RK3 b - - 0 1",
      },
      {
        id: "rook-quiz",
        type: "quiz",
        title: "Rook Endgame Quiz",
        content: "What is the key idea of the Philidor position for the defending side?",
        options: [
          {
            id: "a",
            text: "Trade the Rook for the enemy pawn as quickly as possible",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Place the Rook on the 6th rank to stop the King, then give checks from behind the pawn when it advances",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Keep the King in front of the pawn at all times",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Push your own pawn to create a passed pawn",
            isCorrect: false,
          },
        ],
      },
    ],
  },
];

export default endgameLessons;

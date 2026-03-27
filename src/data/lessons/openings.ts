import type { Lesson } from "@/types";

export const openingsLessons: Lesson[] = [
  {
    id: "openings-italian-game",
    title: "The Italian Game",
    description: "Learn one of the oldest and most popular chess openings: 1.e4 e5 2.Nf3 Nc6 3.Bc4",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["piece-movement-bishop", "piece-movement-knight", "piece-movement-pawn"],
    steps: [
      {
        id: "italian-intro",
        type: "explanation",
        title: "What is the Italian Game?",
        content:
          "The Italian Game is over 500 years old — one of the oldest chess openings ever! White starts with 1.e4 and aims to control the center and develop pieces quickly. The secret weapon is the Bishop on c4, pointing right at f7, the weakest square in Black's camp!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "italian-move1",
        type: "demonstration",
        title: "Open with the King's Pawn",
        content:
          "White plays 1.e4 — the most popular first move in chess! This pawn controls two important center squares (d5 and f5) and opens lines for the Bishop and Queen.",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["e2e4"],
      },
      {
        id: "italian-moves-1-2",
        type: "demonstration",
        title: "Development in Action",
        content:
          "After 1.e4 e5 2.Nf3, White attacks the e5 pawn and develops the Knight toward the center. Black responds 2...Nc6 defending the pawn. Both players are getting their pieces out — great chess habits!",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        moves: ["e7e5", "g1f3", "b8c6"],
      },
      {
        id: "italian-bc4",
        type: "demonstration",
        title: "The Bishop Strikes the Diagonal",
        content:
          "3.Bc4! The Bishop lands on c4, aiming directly at the f7 square. That square is only defended by the Black King, making it a prime target. This is the Italian Game!",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        moves: ["f1c4"],
      },
      {
        id: "italian-exercise",
        type: "exercise",
        title: "Play the Italian Game!",
        content:
          "It's your turn! You are White. The first two moves have been played. Play 3.Bc4 to set up the Italian Game!",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        correctAnswer: "f1c4",
        hints: [
          "Move your f1 Bishop to c4",
          "The Bishop on c4 will eye the f7 square — the weakest point in Black's position",
        ],
      },
      {
        id: "italian-quiz",
        type: "quiz",
        title: "Italian Game Quiz",
        content: "Why does White put the Bishop on c4 in the Italian Game?",
        options: [
          { id: "a", text: "To protect the King", isCorrect: false },
          { id: "b", text: "To aim at the weak f7 square near Black's King", isCorrect: true },
          { id: "c", text: "To block the Knight from moving", isCorrect: false },
          { id: "d", text: "So the Bishop can capture on d5 immediately", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "openings-sicilian-defense",
    title: "The Sicilian Defense",
    description: "The most popular chess opening in the world! Black fights for the center in a sneaky way.",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["openings-italian-game"],
    steps: [
      {
        id: "sicilian-intro",
        type: "explanation",
        title: "Black Fights Back!",
        content:
          "After White plays 1.e4, most beginners respond with 1...e5 to match White in the center. But the Sicilian Defense is different — Black plays 1...c5! This attacks the center from the SIDE instead of head-on. It's the most popular chess opening ever played by grandmasters!",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      },
      {
        id: "sicilian-move1",
        type: "demonstration",
        title: "The Sicilian Start",
        content:
          "Black plays 1...c5! The c5 pawn controls the d4 square, stopping White from placing a pawn there. Black will fight for the center, but from the side — very clever!",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        moves: ["c7c5"],
      },
      {
        id: "sicilian-asymmetry",
        type: "explanation",
        title: "Unbalanced Positions",
        content:
          "The Sicilian creates an 'asymmetric' position — White has more space in the center, while Black has a half-open c-file for the Rook. This means both sides have DIFFERENT plans. White often attacks on the kingside, while Black counterattacks on the queenside. Exciting chess!",
        fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      },
      {
        id: "sicilian-development",
        type: "demonstration",
        title: "Getting Pieces Out",
        content:
          "Both sides develop pieces quickly. White plays 2.Nf3 to control the center and attack d4. Black responds with 2...d6 or 2...Nc6. The game quickly becomes very sharp!",
        fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        moves: ["g1f3", "b8c6"],
      },
      {
        id: "sicilian-exercise",
        type: "exercise",
        title: "Play the Sicilian!",
        content:
          "White just played 1.e4. It's Black's turn! Respond with the Sicilian Defense by playing 1...c5.",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        correctAnswer: "c7c5",
        hints: [
          "Move the c-pawn two squares forward",
          "You want to fight for the d4 square from the side",
        ],
      },
      {
        id: "sicilian-quiz",
        type: "quiz",
        title: "Sicilian Defense Quiz",
        content: "What does the Sicilian Defense (1...c5) do for Black?",
        options: [
          { id: "a", text: "It copies White's move and fights equally in the center", isCorrect: false },
          { id: "b", text: "It controls the d4 square and fights for the center from the side", isCorrect: true },
          { id: "c", text: "It immediately attacks White's King", isCorrect: false },
          { id: "d", text: "It prepares to castle immediately", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "openings-queens-gambit",
    title: "The Queen's Gambit",
    description: "White offers a pawn sacrifice to control the center — should Black take it?",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["openings-italian-game"],
    steps: [
      {
        id: "qg-intro",
        type: "explanation",
        title: "What is a Gambit?",
        content:
          "A 'gambit' is when you offer a pawn (or piece) on purpose to gain an advantage! In the Queen's Gambit, White plays 1.d4 d5 2.c4, offering the c4 pawn. If Black takes it, White gets a big center. If Black declines, White still has great development. Either way, White gets a good game!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "qg-moves",
        type: "demonstration",
        title: "The Queen's Gambit Appears",
        content:
          "White plays 1.d4 to control the center. Black responds 1...d5 to fight back. Then White plays 2.c4 — the Queen's Gambit! White offers the c4 pawn in exchange for strong central control.",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["d2d4", "d7d5", "c2c4"],
      },
      {
        id: "qg-accepted",
        type: "explanation",
        title: "Queen's Gambit Accepted!",
        content:
          "If Black plays 2...dxc4 (taking the pawn), it's called the 'Queen's Gambit Accepted' (QGA). Black wins a pawn but gives up center control. White will play 3.e4 and 4.Bxc4 to get a powerful center and the pawn back. It's a fair trade that leads to exciting play!",
        fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
      },
      {
        id: "qg-declined",
        type: "explanation",
        title: "Queen's Gambit Declined!",
        content:
          "If Black plays 2...e6 (declining the pawn), it's the 'Queen's Gambit Declined' (QGD). Black keeps a solid center but the light-squared Bishop gets locked in. This was the opening used in the famous TV show The Queen's Gambit! It leads to a very solid, strategic game.",
        fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
      },
      {
        id: "qg-exercise",
        type: "exercise",
        title: "Play the Queen's Gambit!",
        content:
          "You are White. Black has just played 1...d5. Play 2.c4 to offer the Queen's Gambit!",
        fen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
        correctAnswer: "c2c4",
        hints: [
          "Push your c-pawn forward two squares",
          "You want to challenge Black's d5 pawn and control the center",
        ],
      },
      {
        id: "qg-quiz",
        type: "quiz",
        title: "Queen's Gambit Quiz",
        content: "In the Queen's Gambit, White offers the c4 pawn. What does White get in return if Black accepts?",
        options: [
          { id: "a", text: "Nothing — it's just a free pawn for Black", isCorrect: false },
          { id: "b", text: "A strong pawn center and faster development", isCorrect: true },
          { id: "c", text: "The chance to immediately checkmate the King", isCorrect: false },
          { id: "d", text: "Control of the h-file", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "openings-ruy-lopez",
    title: "The Ruy Lopez",
    description: "The most classical chess opening — White pressures Black's e5 pawn from the very start!",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["openings-italian-game"],
    steps: [
      {
        id: "ruy-intro",
        type: "explanation",
        title: "The Spanish Opening",
        content:
          "The Ruy Lopez (also called the Spanish Opening) starts with 1.e4 e5 2.Nf3 Nc6 3.Bb5. A Spanish bishop named Ruy López de Segura wrote about this opening in 1561 — that's over 450 years ago! White puts the Bishop on b5 to pressure Black's Knight, which is defending the e5 pawn.",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "ruy-demo",
        type: "demonstration",
        title: "The Opening Moves",
        content:
          "After 1.e4 e5 2.Nf3 Nc6, the position looks just like the start of the Italian Game. But White plays 3.Bb5 instead of 3.Bc4. The Bishop targets the c6 Knight — if the Knight moves, the e5 pawn is undefended!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["e2e4", "e7e5", "g1f3", "b8c6", "f1b5"],
      },
      {
        id: "ruy-pressure",
        type: "explanation",
        title: "Long-Term Pressure",
        content:
          "The Ruy Lopez is all about long-term pressure. White doesn't try to win immediately — instead White builds up a slow, steady squeeze. Top grandmasters love this opening because it gives White a tiny advantage that can last the whole game. Patience is the key!",
        fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
      },
      {
        id: "ruy-exercise",
        type: "exercise",
        title: "Play the Ruy Lopez!",
        content:
          "After 1.e4 e5 2.Nf3 Nc6, play 3.Bb5 to enter the Ruy Lopez. Move the Bishop from f1 to b5!",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        correctAnswer: "f1b5",
        hints: [
          "Move your f1 Bishop to b5",
          "The Bishop on b5 will put pressure on the c6 Knight that defends the e5 pawn",
        ],
      },
      {
        id: "ruy-vs-italian",
        type: "explanation",
        title: "Ruy Lopez vs Italian Game",
        content:
          "The Ruy Lopez (Bb5) and Italian Game (Bc4) are both excellent openings — they start the same way but have different plans! The Italian Game targets f7 directly, while the Ruy Lopez squeezes the e5 pawn indirectly. Both are great choices for White!",
        fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
      },
      {
        id: "ruy-quiz",
        type: "quiz",
        title: "Ruy Lopez Quiz",
        content: "In the Ruy Lopez, why does White place the Bishop on b5?",
        options: [
          { id: "a", text: "To immediately capture the e5 pawn", isCorrect: false },
          { id: "b", text: "To pressure the c6 Knight, which defends the e5 pawn", isCorrect: true },
          { id: "c", text: "To attack the Black Queen", isCorrect: false },
          { id: "d", text: "To prepare to castle queenside", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "openings-french-defense",
    title: "The French Defense",
    description: "Build a solid pawn chain with 1.e4 e6 — a tough fortress for Black!",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["openings-italian-game"],
    steps: [
      {
        id: "french-intro",
        type: "explanation",
        title: "The French Fortress",
        content:
          "The French Defense begins with 1.e4 e6. Instead of fighting directly with 1...e5, Black steps to the side and prepares to build a strong pawn chain. The French is named after a French chess team that used it in a famous match in 1834. It's very solid but a bit cramped at first!",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      },
      {
        id: "french-moves",
        type: "demonstration",
        title: "Building the Pawn Chain",
        content:
          "After 1.e4 e6, Black prepares to play 2...d5 next. This creates a chain of pawns on e6 and d5 that is very hard to crack! White often plays 2.d4 to fight for the center.",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        moves: ["e7e6", "d2d4", "d7d5"],
      },
      {
        id: "french-pawn-chain",
        type: "explanation",
        title: "Understanding Pawn Chains",
        content:
          "After 1.e4 e6 2.d4 d5, both sides have pawn chains. White's chain points toward e6, and Black's chain points toward d4. The secret to pawn chains is to ATTACK THE BASE! White should attack e6, and Black should attack d4. Chess strategy made simple!",
        fen: "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
      },
      {
        id: "french-light-bishop",
        type: "explanation",
        title: "The French Problem",
        content:
          "The French Defense has one weakness: the light-squared Bishop on c8 gets locked in by Black's own pawns on e6 and d5! This Bishop is sometimes called the 'French Bishop' or 'bad bishop.' Finding good squares for this Bishop is one of Black's main challenges in the French.",
        fen: "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
      },
      {
        id: "french-exercise",
        type: "exercise",
        title: "Play the French Defense!",
        content:
          "White just played 1.e4. You are Black. Start the French Defense by playing 1...e6!",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        correctAnswer: "e7e6",
        hints: [
          "Move the e-pawn just one square forward (to e6, not e5)",
          "You are preparing to play d5 on the next move to fight for the center",
        ],
      },
      {
        id: "french-quiz",
        type: "quiz",
        title: "French Defense Quiz",
        content: "What is the main challenge for Black in the French Defense?",
        options: [
          { id: "a", text: "The King is very exposed", isCorrect: false },
          { id: "b", text: "Black has no pawns in the center", isCorrect: false },
          { id: "c", text: "The light-squared Bishop gets locked in by Black's own pawns", isCorrect: true },
          { id: "d", text: "Black cannot castle at all", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "openings-kings-gambit-fried-liver",
    title: "King's Gambit & Fried Liver Attack",
    description: "The wildest chess openings! Sacrifice pawns and pieces to smash open the King's defenses.",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["openings-italian-game"],
    steps: [
      {
        id: "kg-intro",
        type: "explanation",
        title: "What is the King's Gambit?",
        content:
          "The King's Gambit is one of the oldest and most aggressive chess openings! White starts with 1.e4 e5, then plays 2.f4 — offering a pawn right away! If Black takes it (2...exf4), White gets an open center and launches a furious attack on the King. Famous players like Paul Morphy loved this opening!",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      },
      {
        id: "kg-demo",
        type: "demonstration",
        title: "The King's Gambit Offered",
        content:
          "After 1.e4 e5, White plays 2.f4 — the King's Gambit! White offers the f4 pawn to open the f-file and create attacking chances. This is very aggressive and can lead to wild, exciting games!",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        moves: ["e7e5", "f2f4"],
      },
      {
        id: "kg-accepted",
        type: "explanation",
        title: "King's Gambit Accepted!",
        content:
          "If Black plays 2...exf4, it's the King's Gambit Accepted. Black wins a pawn, but White gets a powerful center and open lines for the pieces. White follows up with 3.Nf3 to develop and control the center. The game becomes very tactical and sharp — not for the faint of heart!",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2",
      },
      {
        id: "fried-liver-intro",
        type: "explanation",
        title: "What is the Fried Liver Attack?",
        content:
          "The Fried Liver Attack is one of the most dramatic chess sacrifices you can play! It starts from the Italian Game: after 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5, White threatens f7. If Black plays 4...d5, White plays the shocking 5.exd5 Nxd5 and then... 6.Nxf7! White sacrifices the Knight to destroy Black's King's defenses!",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
      },
      {
        id: "fried-liver-demo",
        type: "demonstration",
        title: "The Fried Liver Sacrifice!",
        content:
          "Watch the Fried Liver Attack! After 4.Ng5 d5 5.exd5 Nxd5, White plays 6.Nxf7!! The Knight captures on f7, forking the King and Queen! Black's King is forced to move, and White wins the Queen. Black gets the Knight, but White has a raging attack!",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 4",
        moves: ["d7d5", "e4d5", "c6d5", "g5f7"],
      },
      {
        id: "kg-exercise",
        type: "exercise",
        title: "Play the King's Gambit!",
        content:
          "White played 1.e4 and Black replied 1...e5. Now play 2.f4 to start the King's Gambit and offer a pawn sacrifice!",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        correctAnswer: "f2f4",
        hints: [
          "Push the f-pawn forward to f4",
          "You are offering a pawn in exchange for a strong center and attacking chances",
        ],
      },
      {
        id: "kg-quiz",
        type: "quiz",
        title: "King's Gambit & Fried Liver Quiz",
        content: "In the Fried Liver Attack, White sacrifices a Knight on f7. What does White win in return?",
        options: [
          { id: "a", text: "Nothing — it's a bad sacrifice", isCorrect: false },
          { id: "b", text: "A Rook", isCorrect: false },
          { id: "c", text: "The Black Queen and a powerful attack on the exposed King", isCorrect: true },
          { id: "d", text: "Two pawns", isCorrect: false },
        ],
      },
    ],
  },
];

export default openingsLessons;

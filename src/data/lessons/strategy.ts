import type { Lesson } from "@/types";

export const strategyLessons: Lesson[] = [
  {
    id: "strategy-center-control",
    title: "Controlling the Center",
    description: "Why the middle of the board is the most important area",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "center-intro",
        type: "explanation",
        title: "The Center of the Board",
        content:
          "The four squares in the very middle of the board — e4, d4, e5, and d5 — are the most important squares in chess! Pieces placed in or near the center control more of the board and can reach any square much faster. Think of it like owning the middle of a playground: you can run to every corner quickly!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "center-pawn-demo",
        type: "demonstration",
        title: "Claiming the Center with Pawns",
        content:
          "Watch White play 1.e4 d4 to grab both central squares. Pawns in the center control key squares and give your other pieces room to develop. This is called a 'pawn center'!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["e2e4", "d7d6", "d2d4"],
      },
      {
        id: "center-piece-control",
        type: "explanation",
        title: "Piece Control of the Center",
        content:
          "You don't always need pawns in the center — pieces can control it too! A Knight on e4 or d4 attacks many squares in all directions. A Bishop on a long diagonal fires right through the center. This is called 'piece control' of the center, and it's just as important as a pawn center!",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      },
      {
        id: "center-hypermodern",
        type: "explanation",
        title: "Fighting the Center from Afar",
        content:
          "Some players let the opponent take the center and then attack it with pieces later! This is called the 'hypermodern' approach. If your opponent builds a big pawn center without supporting it well, those pawns can become weak targets. A big center can be attacked and destroyed!",
        fen: "rnbqkb1r/pppppp1p/5np1/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
      },
      {
        id: "center-exercise",
        type: "exercise",
        title: "Claim the Center!",
        content:
          "White has opened with e4. Now play d4 to establish a strong pawn center and fight for the most important squares on the board!",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1",
        correctAnswer: "d2d4",
        hints: [
          "Think about which square is next to e4 in the center",
          "Move your d-pawn two squares forward to control d4 and e5",
        ],
      },
      {
        id: "center-quiz",
        type: "quiz",
        title: "Center Control Quiz",
        content: "Why is controlling the center of the board so important?",
        options: [
          {
            id: "a",
            text: "Pieces in the center control more squares and can move to any part of the board faster",
            isCorrect: true,
          },
          { id: "b", text: "The center squares are the prettiest on the board", isCorrect: false },
          { id: "c", text: "Pawns in the center cannot be captured", isCorrect: false },
          { id: "d", text: "The King is safest in the center", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-piece-development",
    title: "Piece Development",
    description: "Get your pieces into the game fast and smart!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "development-intro",
        type: "explanation",
        title: "Why Development Matters",
        content:
          "At the start of the game, all your powerful pieces are stuck on the back rank, doing nothing! 'Development' means moving your pieces off the first rank so they join the fight. The player who develops faster usually gets the advantage — like showing up to a battle with your whole army instead of just one soldier!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "development-knights-first",
        type: "explanation",
        title: "Knights Before Bishops",
        content:
          "A golden rule: develop Knights before Bishops! Why? You almost always know where the Knights belong (f3/c3 for White, f6/c6 for Black), but you need to see how the game develops to find the best squares for your Bishops. Knights jump over pawns so they can develop even when the position is closed.",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      },
      {
        id: "development-demo",
        type: "demonstration",
        title: "Good Development in Action",
        content:
          "Watch good development: both Knights come out first, pointing toward the center, then Bishops develop, then castling. Every move brings a new piece into the game!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["e2e4", "e7e5", "g1f3", "b8c6", "f1c4", "g8f6"],
      },
      {
        id: "development-same-piece",
        type: "explanation",
        title: "Don't Move the Same Piece Twice!",
        content:
          "Moving the same piece twice in the opening wastes precious time — called 'losing a tempo.' While you move one piece twice, your opponent brings out a brand new piece. That's like your opponent getting two moves and you only getting one! Every opening move should ideally develop a new piece.",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
      },
      {
        id: "development-queen-early",
        type: "explanation",
        title: "Don't Bring the Queen Out Too Early!",
        content:
          "The Queen is your most powerful piece, but bringing her out early is risky. Your opponent can attack her with less valuable pieces like Knights and Bishops, forcing her to run away and wasting moves. Develop your minor pieces first, keep your Queen safe, and bring her out when she has a clear purpose!",
        fen: "rnb1kbnr/pppp1ppp/8/4p3/4P2q/8/PPPP1PPP/RNBQKBNR w KQkq - 2 3",
      },
      {
        id: "development-quiz",
        type: "quiz",
        title: "Development Quiz",
        content: "Which of these is NOT a good opening principle?",
        options: [
          { id: "a", text: "Develop your Knights before your Bishops", isCorrect: false },
          { id: "b", text: "Try to develop a new piece with each move", isCorrect: false },
          {
            id: "c",
            text: "Move your Queen out as quickly as possible to attack",
            isCorrect: true,
          },
          { id: "d", text: "Castle early to keep your King safe", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-king-safety",
    title: "King Safety",
    description: "Keep your King safe — losing it means losing the game!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "king-safety-intro",
        type: "explanation",
        title: "The Most Important Piece",
        content:
          "Your King is the most important piece in chess — if it gets checkmated, you lose! Unlike other pieces, your King can't be traded away or sacrificed. Keeping your King safe is one of the most important strategies in chess. A King in danger is a King in trouble!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "king-safety-castle",
        type: "demonstration",
        title: "Castle Early!",
        content:
          "Castling moves your King to the corner behind a wall of pawns, and brings your Rook into the game at the same time. It's one of the best moves you can make! Watch how castling tucks the King away safely on the kingside.",
        fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 5",
        moves: ["e1g1"],
      },
      {
        id: "king-safety-pawn-shelter",
        type: "explanation",
        title: "Pawn Shelter",
        content:
          "After castling, the pawns in front of your King act like a shield — called a 'pawn shelter.' Try to keep the pawns on f2, g2, and h2 (for White) intact. Moving them creates gaps that attacking pieces can use to reach your King. A solid pawn shelter = a safe King!",
        fen: "r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 6 6",
      },
      {
        id: "king-safety-uncastled",
        type: "explanation",
        title: "Attacking an Uncastled King",
        content:
          "If your opponent hasn't castled, their King is stuck in the center — and that's a big target! Open files, diagonals, and ranks can all be used to attack a King stuck in the middle. This is why developing quickly and castling early is so important: you don't want to be the one with a vulnerable King!",
        fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 4 4",
      },
      {
        id: "king-safety-exercise",
        type: "exercise",
        title: "Castle to Safety!",
        content:
          "Your pieces are developed and ready. Castle kingside to tuck your King away safely and bring your Rook toward the center!",
        fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 5",
        correctAnswer: "e1g1",
        hints: [
          "Castling moves the King two squares toward the Rook",
          "Kingside castling puts your King on g1 and Rook on f1",
        ],
      },
      {
        id: "king-safety-quiz",
        type: "quiz",
        title: "King Safety Quiz",
        content: "What is the main benefit of castling early in the game?",
        options: [
          { id: "a", text: "It lets you win the opponent's pieces faster", isCorrect: false },
          {
            id: "b",
            text: "It moves the King to a safer corner and activates a Rook at the same time",
            isCorrect: true,
          },
          { id: "c", text: "It makes your King more powerful", isCorrect: false },
          { id: "d", text: "It gives you an extra pawn", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-pawn-structure",
    title: "Pawn Structure",
    description: "Learn how pawns shape the game — for good or for bad!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "pawn-structure-intro",
        type: "explanation",
        title: "Pawns Are the Soul of Chess",
        content:
          "The legendary player Philidor said 'Pawns are the soul of chess!' Your pawn structure — the pattern of how your pawns are arranged — affects the whole game. Pawns can't move backwards, so once you push them, they're committed. Good pawn structure gives you strong squares and passed pawns; bad structure gives you weaknesses your opponent can attack!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "pawn-structure-doubled",
        type: "explanation",
        title: "Doubled Pawns",
        content:
          "Doubled pawns are two pawns of the same color on the same file. They're usually a weakness because one blocks the other! They can't protect each other and need pieces to defend them. Sometimes doubled pawns are okay, but try to avoid them if you can.",
        fen: "rnbqkb1r/ppp2ppp/3p4/4p3/4P3/2NP4/PPP2PPP/R1BQKBNR w KQkq - 0 5",
      },
      {
        id: "pawn-structure-isolated",
        type: "explanation",
        title: "Isolated Pawns",
        content:
          "An isolated pawn has no friendly pawns on neighboring files to protect it. This makes it a target — your opponent can attack it with pieces while you have to defend it with pieces too. However, isolated pawns often come with open files that can be used by your Rooks, so they're a trade-off!",
        fen: "r1bqkb1r/pp3ppp/2np1n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6",
      },
      {
        id: "pawn-structure-chains",
        type: "explanation",
        title: "Pawn Chains",
        content:
          "A pawn chain is a diagonal line of pawns, each one protecting the one in front. The base of the chain — the pawn at the back — is the most important. If your opponent captures the base, the whole chain can collapse! Attack the base of your opponent's pawn chain and defend your own.",
        fen: "rnbqkb1r/pp3ppp/2pp1n2/4p3/2PPP3/2N5/PP3PPP/R1BQKBNR w KQkq - 0 5",
      },
      {
        id: "pawn-structure-passed",
        type: "demonstration",
        title: "The Mighty Passed Pawn",
        content:
          "A passed pawn has no enemy pawns blocking it or on adjacent files. It's free to march to the other end of the board and promote! Passed pawns are huge advantages, especially in the endgame. Watch this passed pawn advance!",
        fen: "4k3/8/3PK3/8/8/8/8/8 w - - 0 1",
        moves: ["d6d7", "e8d8", "e6f7"],
      },
      {
        id: "pawn-structure-quiz",
        type: "quiz",
        title: "Pawn Structure Quiz",
        content: "Why are doubled pawns generally considered a weakness?",
        options: [
          { id: "a", text: "They can move backwards and get captured easily", isCorrect: false },
          {
            id: "b",
            text: "One pawn blocks the other, and they cannot protect each other",
            isCorrect: true,
          },
          { id: "c", text: "Doubled pawns are always in the center", isCorrect: false },
          { id: "d", text: "They make it impossible to castle", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-open-files-rooks",
    title: "Open Files & Rooks",
    description: "Put your Rooks on open files to unleash their true power!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "open-files-intro",
        type: "explanation",
        title: "What Is an Open File?",
        content:
          "A file is 'open' when there are no pawns on it — for either player! A 'half-open' file has no pawns for one player but does for the other. Rooks love open and half-open files because they can slide all the way up and down without anything blocking them. Placing your Rook on an open file is like giving it a super highway!",
        fen: "r1bqk2r/ppp2ppp/2n2n2/3pp3/3PP3/2N2N2/PPP2PPP/R1BQK2R w KQkq - 4 6",
      },
      {
        id: "open-files-demo",
        type: "demonstration",
        title: "Rook Takes the Open File",
        content:
          "After pawns are exchanged, the e-file becomes open. Watch the Rook slide onto e1 to dominate the open file and pressure the enemy!",
        fen: "r1bqkb1r/ppp2ppp/2n2n2/3p4/4P3/2N2N2/PPP2PPP/R1BQ1RK1 w kq - 0 6",
        moves: ["e4d5", "f6d5", "f1e1"],
      },
      {
        id: "open-files-doubling",
        type: "explanation",
        title: "Doubling Rooks",
        content:
          "When both of your Rooks line up on the same open file, they form a 'battery' — one of the most powerful setups in chess! The front Rook controls the file, and the back Rook supports it. Together they can push into the enemy position or put the opponent's pieces under huge pressure. This is called 'doubling Rooks'!",
        fen: "r1b2rk1/ppp2ppp/2n5/3q4/8/2N5/PPP2PPP/2KRR3 w - - 0 12",
      },
      {
        id: "open-files-seventh-rank",
        type: "explanation",
        title: "Rooks on the Seventh Rank",
        content:
          "The 7th rank (for White) or 2nd rank (for Black) is called the 'pig rank' when a Rook gets there — because Rooks on the 7th rank gobble up pawns like hungry pigs! A Rook on the 7th rank attacks all the pawns that haven't moved and traps the King. Two Rooks on the 7th rank are almost always winning!",
        fen: "6k1/RR6/8/8/8/8/8/6K1 w - - 0 1",
      },
      {
        id: "open-files-exercise",
        type: "exercise",
        title: "Claim the Open File!",
        content:
          "The e-file is wide open with no pawns blocking it. Move your Rook to e1 to take control of the open file and threaten to invade the enemy position!",
        fen: "r1bqkb1r/ppp2ppp/2n2n2/8/3p4/2N2N2/PPP2PPP/R1BQ1RK1 w kq - 0 6",
        correctAnswer: "f1e1",
        hints: [
          "Look for a file with no pawns on it",
          "Move your Rook from f1 to e1 to sit on the open e-file",
        ],
      },
      {
        id: "open-files-quiz",
        type: "quiz",
        title: "Open Files Quiz",
        content: "What is the difference between an open file and a half-open file?",
        options: [
          {
            id: "a",
            text: "An open file has no pawns for either player; a half-open file has no pawns for one player only",
            isCorrect: true,
          },
          {
            id: "b",
            text: "An open file is longer than a half-open file",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Half-open files can only be used by Bishops",
            isCorrect: false,
          },
          {
            id: "d",
            text: "There is no difference — they are the same thing",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: "strategy-outposts",
    title: "Outposts",
    description: "Plant your Knight on a strong square where it can never be chased away!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "outposts-intro",
        type: "explanation",
        title: "What Is an Outpost?",
        content:
          "An outpost is a square deep in the opponent's territory that cannot be attacked by their pawns. Once you place a Knight on an outpost, it's like planting a flag — the Knight sits there safely, controls many squares, and can't be kicked away! Knights love outposts more than any other piece because they need stable squares to be effective.",
        fen: "r2qkb1r/ppp2ppp/2n2n2/3pp3/3PP3/2N2N2/PPP2PPP/R1BQK2R w KQkq - 4 6",
      },
      {
        id: "outposts-how-created",
        type: "explanation",
        title: "How Pawns Create Outposts",
        content:
          "Outposts are created when your pawns advance to force gaps in the opponent's pawn structure. If the opponent has no pawn that can attack a square, your Knight can settle there forever! For example, if White has a pawn on e5 and Black has no d-pawn or f-pawn, then d6 becomes a fantastic outpost for White's Knight.",
        fen: "r1bqkb1r/ppp2ppp/2n2n2/3pP3/8/2N2N2/PPP2PPP/R1BQK2R w KQkq - 0 6",
      },
      {
        id: "outposts-demo",
        type: "demonstration",
        title: "Knight on an Outpost",
        content:
          "Watch the Knight hop to d6 — a powerful outpost in the heart of Black's position. The Knight on d6 attacks c8, e8, f7, and f5, and Black has no pawns to chase it away!",
        fen: "r1bqkb1r/pp3ppp/5n2/3pP3/4N3/2N5/PPP2PPP/R1BQK2R w KQkq - 2 7",
        moves: ["e4d6"],
      },
      {
        id: "outposts-exercise",
        type: "exercise",
        title: "Find the Outpost!",
        content:
          "Your Knight is on e4 and has a chance to jump to a perfect outpost on d6 — deep in Black's position where no pawns can chase it away. Make that Knight leap!",
        fen: "r1bqkb1r/pp4pp/3p1n2/4p3/4N3/2N5/PPP2PPP/R1BQK2R w KQkq - 0 8",
        correctAnswer: "e4d6",
        hints: [
          "Look for a square in the opponent's half that their pawns cannot attack",
          "Knights are strongest when placed on outpost squares in the center",
        ],
      },
      {
        id: "outposts-quiz",
        type: "quiz",
        title: "Outposts Quiz",
        content: "Which piece benefits the most from being placed on an outpost?",
        options: [
          { id: "a", text: "The Rook", isCorrect: false },
          { id: "b", text: "The Queen", isCorrect: false },
          { id: "c", text: "The Knight", isCorrect: true },
          { id: "d", text: "The Pawn", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-good-bad-bishop",
    title: "Good Bishop vs Bad Bishop",
    description: "Learn why some Bishops are heroes and others are stuck at home!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "good-bad-bishop-intro",
        type: "explanation",
        title: "What Makes a Bishop Good or Bad?",
        content:
          "A Bishop can only ever move on squares of one color — light or dark. A 'good Bishop' moves freely on open diagonals and isn't blocked by its own pawns. A 'bad Bishop' is blocked by pawns sitting on the same color squares as the Bishop itself. It's stuck behind its own traffic jam!",
        fen: "4k3/pp3ppp/2p5/8/2b5/8/PP3PPP/4K3 w - - 0 1",
      },
      {
        id: "good-bad-bishop-same-color",
        type: "explanation",
        title: "Pawns on the Same Color",
        content:
          "Here's the key rule: if your pawns are mostly on the SAME color as your Bishop, that Bishop is 'bad.' The pawns block the diagonals the Bishop needs to move on! Try to keep your pawns on the OPPOSITE color from your Bishop whenever possible, so the Bishop can roam free on open diagonals.",
        fen: "4k3/8/2p1p3/1p1p4/8/8/1P1P4/B3K3 w - - 0 1",
      },
      {
        id: "good-bad-bishop-demo",
        type: "demonstration",
        title: "The Good Bishop in Action",
        content:
          "Watch how the good Bishop (on open diagonals) zooms across the board to help its King win the endgame, while the bad Bishop sits stuck behind its own pawns!",
        fen: "6k1/8/4p3/3b4/8/8/4B3/6K1 w - - 0 1",
        moves: ["e2b5", "g8f8", "b5c6"],
      },
      {
        id: "good-bad-bishop-opposite",
        type: "explanation",
        title: "Opposite-Colored Bishops",
        content:
          "When each player has one Bishop but they're on opposite colors, neither Bishop can ever capture the other! This creates 'opposite-colored bishop' positions, which are famous for being drawn in endgames even when one side has an extra pawn. In the middlegame however, opposite-colored bishops can be a big attacking advantage — you attack squares your opponent can't defend!",
        fen: "4k3/8/8/8/3B4/8/8/4K2b w - - 0 1",
      },
      {
        id: "good-bad-bishop-exercise",
        type: "exercise",
        title: "Improve Your Bishop!",
        content:
          "Your light-squared Bishop is currently blocked on e2. Move it to c4 where it has a beautiful open diagonal pointing toward Black's weak f7 pawn!",
        fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/3PP3/5N2/PPP1BPPP/RNBQK2R w KQkq - 2 5",
        correctAnswer: "e2c4",
        hints: [
          "The Bishop on e2 is blocked — find a better diagonal for it",
          "c4 is a great square for the Bishop, aiming at f7",
        ],
      },
      {
        id: "good-bad-bishop-quiz",
        type: "quiz",
        title: "Good vs Bad Bishop Quiz",
        content: "When is a Bishop called a 'bad Bishop'?",
        options: [
          { id: "a", text: "When it has never captured any pieces", isCorrect: false },
          {
            id: "b",
            text: "When its own pawns are on the same color squares as the Bishop, blocking its diagonals",
            isCorrect: true,
          },
          { id: "c", text: "When it is on the edge of the board", isCorrect: false },
          { id: "d", text: "When the opponent has a stronger Bishop", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-when-to-trade",
    title: "When to Trade Pieces",
    description: "Know when to swap pieces and when to hold on to them!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "when-to-trade-intro",
        type: "explanation",
        title: "Trading Pieces — A Strategic Decision",
        content:
          "Every time you capture a piece and your opponent captures back, that's a 'trade.' Trading isn't just about material — it's a strategic decision! Sometimes a trade makes your position much better, and sometimes it helps your opponent. Learning WHEN to trade and WHEN to avoid trading is one of the most important strategy skills in chess!",
        fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      },
      {
        id: "when-to-trade-simplify",
        type: "explanation",
        title: "Simplify When You're Ahead!",
        content:
          "If you're winning — more material, a passed pawn, a better position — trade pieces! Every trade reduces the number of pieces your opponent can use to complicate the game or make a comeback. A Rook and pawn vs Rook is much simpler than a complicated middlegame. Simplifying makes your advantage clearer and harder to escape from.",
        fen: "4k3/8/8/3q4/8/8/3Q4/4K3 w - - 0 1",
      },
      {
        id: "when-to-trade-keep-attacking",
        type: "explanation",
        title: "Keep Your Pieces When Attacking!",
        content:
          "If your opponent's King is under attack, keep as many pieces as possible! More pieces = more attacking power. Trading off your attacking pieces relieves the pressure and gives your opponent a chance to defend or counterattack. Hold onto your pieces when you have an attack brewing!",
        fen: "r1bqk2r/ppp2ppp/2np1n2/2b1p3/2B1PP2/2NP1N2/PPP3PP/R1BQK2R b KQkq - 0 7",
      },
      {
        id: "when-to-trade-demo",
        type: "demonstration",
        title: "Trade into a Winning Endgame",
        content:
          "White has an extra pawn and wants to trade Queens to simplify. Watch: White plays Qd5, offering the trade. Black's Queen on a5 has no choice but to take. Then White recaptures with the pawn exd5. Now it's King and pawn vs King — an easy win!",
        fen: "4k3/8/8/q7/4P3/8/8/3QK3 w - - 0 1",
        moves: ["d1d5", "a5d5", "e4d5"],
      },
      {
        id: "when-to-trade-bad-bishop-trade",
        type: "explanation",
        title: "Trade Your Bad Pieces!",
        content:
          "Another great reason to trade: swap your worst pieces for your opponent's best pieces! If your Bishop is blocked by your own pawns (a 'bad Bishop'), trade it for an active enemy Knight or Bishop. You're turning your weakness into your opponent's weakness. Always think about trading your bad pieces for your opponent's good ones!",
        fen: "r2qkb1r/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 7",
      },
      {
        id: "when-to-trade-quiz",
        type: "quiz",
        title: "Trading Quiz",
        content: "You are a Rook ahead in material. What should you generally try to do?",
        options: [
          {
            id: "a",
            text: "Avoid all trades to keep the position complicated",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Trade pieces to simplify the position and make your material advantage count",
            isCorrect: true,
          },
          { id: "c", text: "Launch an immediate attack on the King", isCorrect: false },
          { id: "d", text: "Push all your pawns forward immediately", isCorrect: false },
        ],
      },
    ],
  },
];

export default strategyLessons;

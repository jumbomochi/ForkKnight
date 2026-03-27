import type { Lesson } from "@/types";

export const famousGamesLessons: Lesson[] = [
  {
    id: "famous-immortal-game",
    title: "The Immortal Game",
    description: "Anderssen vs Kieseritzky (1851) — sacrificing everything for checkmate!",
    category: "famous-games",
    difficulty: "intermediate",
    steps: [
      {
        id: "immortal-intro",
        type: "explanation",
        title: "The Immortal Game",
        content:
          "In 1851, Adolf Anderssen played what became known as 'The Immortal Game' against Lionel Kieseritzky. Anderssen gave away almost ALL of his pieces — two rooks, a bishop, AND his queen — just to deliver checkmate! Chess players still talk about this game 170 years later. Let's find out what made it so amazing!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "immortal-opening",
        type: "explanation",
        title: "The King's Gambit Opening",
        content:
          "Anderssen opened with the King's Gambit — 1.e4 e5 2.f4! He offered a pawn to get his pieces moving fast. This was a very popular and daring opening in the 1800s. Kieseritzky accepted the pawn with 2...exf4. The battle was on! Anderssen wanted to attack, attack, attack.",
        fen: "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3",
      },
      {
        id: "immortal-sacrifice-rooks",
        type: "explanation",
        title: "Giving Away Rooks!",
        content:
          "Here's where it gets WILD! Anderssen sacrificed not one, but TWO rooks to keep his attack going. Most players would never give up a rook unless they had to. But Anderssen saw something incredible — he could deliver checkmate if he kept attacking. His pieces worked together like a perfect machine!",
        fen: "r1bk3r/p2pBpNp/n4n2/1p6/2B5/8/PPP3PP/R4bKR w - - 2 17",
      },
      {
        id: "immortal-queen-sacrifice",
        type: "explanation",
        title: "The Queen Sacrifice!",
        content:
          "Then Anderssen did the unthinkable — he sacrificed his QUEEN! Kieseritzky happily took it. But Anderssen had seen ahead: with just his remaining pieces, he could force checkmate. This is called a 'combination' — a series of moves that leads to a forced outcome. Can you imagine sacrificing your queen on purpose?",
        fen: "r1bk3r/p2pBpNp/n4n2/1p6/2B5/8/PPP3PP/R4bK1 b - - 0 17",
      },
      {
        id: "immortal-final",
        type: "explanation",
        title: "The Final Checkmate!",
        content:
          "In the final position, Anderssen had given up his Queen, both Rooks, and a Bishop — yet his remaining pieces delivered checkmate! The Bishop and Knight worked together perfectly to trap the King. Kieseritzky was checkmated even though he had a huge material advantage. This is why it's called 'The Immortal Game' — piece activity and coordination beat raw material!",
        fen: "1rb4r/pkPp3p/1b6/1Q6/8/8/PPP2B1P/2KR4 w - - 0 1",
      },
      {
        id: "immortal-quiz",
        type: "quiz",
        title: "Immortal Game Quiz",
        content: "What did Anderssen sacrifice to deliver checkmate in the Immortal Game?",
        options: [
          { id: "a", text: "Only a knight", isCorrect: false },
          { id: "b", text: "Two rooks, a bishop, AND his queen", isCorrect: true },
          { id: "c", text: "Just his queen", isCorrect: false },
          { id: "d", text: "All his pawns", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "famous-opera-game",
    title: "The Opera Game",
    description: "Morphy vs Duke & Count (1858) — teaching a chess lesson at the opera!",
    category: "famous-games",
    difficulty: "intermediate",
    steps: [
      {
        id: "opera-intro",
        type: "explanation",
        title: "Chess at the Opera",
        content:
          "In 1858, Paul Morphy went to the opera in Paris. But instead of watching the show, the Duke of Brunswick and Count Isouard dragged him into a chess game! Morphy was the best player in the world at that time. He played so brilliantly that this game became one of the most famous ever played. Morphy finished the game in just 17 moves!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "opera-development",
        type: "explanation",
        title: "Develop Your Pieces First!",
        content:
          "Morphy's secret was simple: develop all your pieces FAST before attacking! After 1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Bc4 Nf6, look at the position. Morphy has his bishop aimed at f7, the weakest square near the black king. His opponents were bringing their queen out too early instead of developing!",
        fen: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 1 7",
      },
      {
        id: "opera-qb3",
        type: "demonstration",
        title: "The Powerful Qb3!",
        content:
          "Morphy played Qb3! This brilliant move attacks BOTH f7 (the weak square next to the king) AND the b7 pawn at the same time. The opponents couldn't defend everything. Notice how Morphy's pieces all work together while Black's pieces are stuck and uncoordinated.",
        fen: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 1 7",
        moves: ["f3b3"],
      },
      {
        id: "opera-castling",
        type: "explanation",
        title: "Castle to Safety, Then Attack!",
        content:
          "After getting his pieces out, Morphy castled to keep his king safe. Then he doubled his rooks on the open d-file. By move 14, Morphy had ALL his pieces in the game working together, while the Duke and Count had their queen stuck trying to defend everything. This is why development matters so much!",
        fen: "2kr3r/ppp2ppp/2n5/2b1p3/2B1P3/1QB5/PPP2PPP/2KR3R w - - 6 14",
      },
      {
        id: "opera-finale",
        type: "explanation",
        title: "The Beautiful Finish!",
        content:
          "The final combination is stunning! Morphy sacrificed his Queen with Qb8+! The Knight had to capture (Nxb8), and then Rd8# — the Rook delivered checkmate on the back rank! Morphy gave up his most powerful piece to clear the way for a simple Rook checkmate. Three brilliant moves to finish the game. This is the power of piece coordination!",
        fen: "1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b - - 1 17",
      },
      {
        id: "opera-quiz",
        type: "quiz",
        title: "Opera Game Quiz",
        content: "What was Morphy's most important strategy in the Opera Game?",
        options: [
          { id: "a", text: "Attacking with his queen as early as possible", isCorrect: false },
          { id: "b", text: "Keeping all his pieces on the back rank", isCorrect: false },
          {
            id: "c",
            text: "Developing all pieces quickly and coordinating their attack",
            isCorrect: true,
          },
          { id: "d", text: "Trading queens to reach an endgame", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "famous-kasparov-immortal",
    title: "Kasparov's Immortal",
    description: "Kasparov vs Topalov (1999) — the greatest game of the computer age!",
    category: "famous-games",
    difficulty: "intermediate",
    steps: [
      {
        id: "kasparov-intro",
        type: "explanation",
        title: "The Greatest Modern Game",
        content:
          "In 1999, Garry Kasparov — considered the greatest chess player of all time — played a game so amazing it's called 'Kasparov's Immortal.' His opponent was Veselin Topalov, one of the top players in the world. Kasparov played a rook sacrifice so unexpected that even computer chess engines didn't understand it at first. Let's explore this masterpiece!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "kasparov-setup",
        type: "explanation",
        title: "Kasparov's Style: Tactics + Strategy",
        content:
          "Kasparov was famous for combining tactical fireworks with deep strategic understanding. By move 24 of this game, Kasparov's pieces were beautifully placed and he spotted something incredible. His rook on d1 could go to d4 — even though Topalov could simply take it! But Kasparov had calculated 14 moves ahead to see that it led to a winning position.",
        fen: "r3r1k1/pp3ppp/1qp1bn2/3p4/3P1B2/2PBR2Q/PP3PPP/4R1K1 w - - 0 24",
      },
      {
        id: "kasparov-rxd4",
        type: "explanation",
        title: "The Stunning Rook Sacrifice!",
        content:
          "Kasparov played Rxd4!! — sacrificing his Rook by capturing a pawn on d4 where Topalov could simply take it back! This is a positional sacrifice — giving up material to gain overwhelming piece activity. Topalov captured the Rook, but Kasparov's remaining Queen, Bishop, and Rook crashed through like a tidal wave.",
        fen: "r3r1k1/pp3ppp/1qp1bn2/3p4/3P1B2/2PBR2Q/PP3PPP/4R1K1 w - - 0 24",
      },
      {
        id: "kasparov-attack",
        type: "explanation",
        title: "What Made It Work",
        content:
          "The key lesson from Kasparov's sacrifice: sometimes ACTIVITY is worth more than material! A piece that can't move or help in the attack is almost useless. Kasparov's pieces had maximum activity — his Queen, Bishops, and Rook all aimed at Topalov's King at once. Meanwhile, Topalov's pieces were tangled up and couldn't help defend. This is called a 'positional sacrifice.'",
        fen: "r3r1k1/pp3ppp/1qp1bn2/3p4/3P1B2/2PBR2Q/PP3PPP/4R1K1 w - - 0 24",
      },
      {
        id: "kasparov-quiz",
        type: "quiz",
        title: "Kasparov's Immortal Quiz",
        content: "Why did Kasparov sacrifice his rook in this game?",
        options: [
          { id: "a", text: "He made a mistake and didn't see it could be taken", isCorrect: false },
          { id: "b", text: "To get a draw", isCorrect: false },
          {
            id: "c",
            text: "To gain powerful piece activity and a winning attack",
            isCorrect: true,
          },
          { id: "d", text: "To trade into a better endgame", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "famous-game-of-century",
    title: "The Game of the Century",
    description: "Fischer vs Byrne (1956) — a 13-year-old's queen sacrifice shocked the world!",
    category: "famous-games",
    difficulty: "intermediate",
    steps: [
      {
        id: "century-intro",
        type: "explanation",
        title: "A 13-Year-Old Genius",
        content:
          "In 1956, a 13-year-old named Bobby Fischer played against Donald Byrne, one of the best players in America. What happened next shocked the entire chess world. Fischer — playing as Black — sacrificed his QUEEN in the middle of the game and then used his remaining pieces so perfectly that Byrne could not stop the checkmate. Chess journalist Hans Kmoch called it 'The Game of the Century!'",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "century-gruenfeld",
        type: "explanation",
        title: "The Grünfeld Defense",
        content:
          "Fischer played the Grünfeld Defense as Black: 1.Nf3 Nf6 2.c4 g6 3.Nc3 d5. In this opening, Black lets White build a big pawn center and then attacks it! The game continued into a complex middlegame where both sides had active pieces. By move 17, Fischer spotted something incredible that no one else saw.",
        fen: "r4rk1/pp1bppbp/1qn3p1/3p4/3P4/2N1BN2/PP2QPPP/R4RK1 b - - 5 17",
      },
      {
        id: "century-queen-sacrifice",
        type: "explanation",
        title: "The Queen Sacrifice!",
        content:
          "Fischer played a series of stunning Knight moves, capturing key pieces while leaving his own Queen hanging! Byrne finally captured Fischer's Queen, but it was too late — Fischer's two Bishops, Rook, and Knight were all perfectly coordinated for a devastating attack. Fischer had willingly given up the most powerful piece on the board because he saw that his remaining pieces working together were even stronger!",
        fen: "r4rk1/pp1bppbp/1q4p1/3p4/2nP4/2N1BN2/PP2QPPP/R4RK1 b - - 7 18",
      },
      {
        id: "century-coordination",
        type: "explanation",
        title: "Minor Piece Magic",
        content:
          "After giving up the queen, Fischer's bishops and knights worked together brilliantly — this is called 'piece coordination.' His dark-squared bishop on g7 was especially powerful, cutting across the board. Byrne tried to hold on, but Fischer's pieces were just too active. Every move by Fischer's pieces created new threats that Byrne couldn't handle all at once.",
        fen: "r4rk1/pp1bppbp/6p1/3p4/2nP4/2P1pN2/PP2Q1PP/R4RK1 w - - 0 20",
      },
      {
        id: "century-final",
        type: "explanation",
        title: "Winning with Minor Pieces",
        content:
          "Fischer eventually won back enough material and converted his advantage into a winning endgame. The game showed that PIECE COORDINATION — all your pieces working together — can be more powerful than just having more material. Two bishops and a rook working together can beat a queen if they're perfectly placed. Fischer went on to become World Champion in 1972!",
        fen: "6k1/pp1bpp1p/6p1/8/1bpP4/2P1BN2/PP4PP/5RK1 b - - 2 28",
      },
      {
        id: "century-quiz",
        type: "quiz",
        title: "Game of the Century Quiz",
        content: "How old was Bobby Fischer when he played the Game of the Century?",
        options: [
          { id: "a", text: "18 years old", isCorrect: false },
          { id: "b", text: "21 years old", isCorrect: false },
          { id: "c", text: "13 years old", isCorrect: true },
          { id: "d", text: "16 years old", isCorrect: false },
        ],
      },
    ],
  },
];

export default famousGamesLessons;

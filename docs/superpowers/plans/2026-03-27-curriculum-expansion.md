# Curriculum Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 23 new chess lessons across 4 categories (Openings, Strategy, Endgames, Famous Games) and update the lessons screen to display all 6 categories in progression order.

**Architecture:** Each new category gets its own data file in `src/data/lessons/` following the existing pattern (beginner.ts, tactics.ts). The lessons index re-exports all categories. The lessons screen renders all 6 sections.

**Tech Stack:** TypeScript, React Native, Expo Router, chess.js (FEN notation)

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/data/lessons/openings.ts` | 6 opening lessons |
| Create | `src/data/lessons/strategy.ts` | 8 strategy lessons |
| Create | `src/data/lessons/endgames.ts` | 5 endgame lessons |
| Create | `src/data/lessons/famous-games.ts` | 4 famous game lessons |
| Modify | `src/data/lessons/index.ts` | Import and export all lesson arrays |
| Modify | `app/(tabs)/lessons.tsx` | Display 6 sections in progression order |

---

### Task 1: Create Openings Lessons

**Files:**
- Create: `src/data/lessons/openings.ts`

- [ ] **Step 1: Create openings.ts with all 6 lessons**

Create `src/data/lessons/openings.ts` with the following content:

```typescript
import type { Lesson } from "@/types";

export const openingsLessons: Lesson[] = [
  {
    id: "openings-italian-game",
    title: "Italian Game",
    description: "A classic opening that teaches great development principles",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["piece-movement-bishop", "piece-movement-knight"],
    steps: [
      {
        id: "italian-intro",
        type: "explanation",
        title: "What is an Opening?",
        content:
          "The opening is the first phase of a chess game. A good opening develops your pieces quickly, controls the center, and keeps your King safe. The Italian Game is one of the oldest and best openings to learn!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "italian-e4",
        type: "demonstration",
        title: "1. e4 — Claim the Center",
        content:
          "White starts by pushing the King's pawn two squares. This controls the center and opens lines for the Bishop and Queen.",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["e2e4", "e7e5"],
      },
      {
        id: "italian-nf3",
        type: "demonstration",
        title: "2. Nf3 — Develop with a Threat",
        content:
          "The Knight comes out to f3, attacking Black's e5 pawn. This is a developing move with a purpose! Black defends with Nc6.",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        moves: ["g1f3", "b8c6"],
      },
      {
        id: "italian-bc4",
        type: "demonstration",
        title: "3. Bc4 — The Italian Bishop",
        content:
          "The Bishop goes to c4, pointing at the f7 pawn — the weakest point in Black's position (only the King defends it). This is what makes it the Italian Game!",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        moves: ["f1c4"],
      },
      {
        id: "italian-exercise",
        type: "exercise",
        title: "Your Turn — Develop!",
        content:
          "You're playing White. It's move 3. Develop your Bishop to the best square, targeting Black's weak f7 pawn.",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        correctAnswer: "f1c4",
        hints: [
          "Which Bishop can you develop?",
          "The f7 pawn is only defended by the King",
        ],
      },
      {
        id: "italian-quiz",
        type: "quiz",
        title: "Italian Game Quiz",
        content: "Why is the move Bc4 (Bishop to c4) a strong choice in the Italian Game?",
        options: [
          { id: "a", text: "It attacks the f7 pawn, Black's weakest point", isCorrect: true },
          { id: "b", text: "It protects the King", isCorrect: false },
          { id: "c", text: "It blocks Black's pawns", isCorrect: false },
          { id: "d", text: "It attacks the Queen", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "openings-sicilian-defense",
    title: "Sicilian Defense",
    description: "The most popular response to 1.e4 — fight for the center differently!",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["openings-italian-game"],
    steps: [
      {
        id: "sicilian-intro",
        type: "explanation",
        title: "A Different Approach",
        content:
          "Instead of matching White's 1.e4 with 1...e5, Black plays 1...c5! This fights for the center in a different way — Black doesn't mirror White but instead creates an unbalanced game.",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      },
      {
        id: "sicilian-c5",
        type: "demonstration",
        title: "1...c5 — The Sicilian Move",
        content:
          "Black's c5 pawn controls the d4 square, preventing White from easily building a big pawn center. It also opens lines for Black's Queen.",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        moves: ["c7c5"],
      },
      {
        id: "sicilian-open",
        type: "demonstration",
        title: "The Open Sicilian",
        content:
          "After 2.Nf3 d6 3.d4, White pushes forward. Black captures cxd4, and White recaptures Nxd4. Now the game is open and sharp!",
        fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        moves: ["g1f3", "d7d6", "d2d4", "c5d4", "f3d4"],
      },
      {
        id: "sicilian-ideas",
        type: "explanation",
        title: "Why Play the Sicilian?",
        content:
          "The Sicilian is popular because Black gets active counterplay. White usually attacks on the Kingside, while Black fights on the Queenside. It leads to exciting, fighting games!",
        fen: "rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4",
      },
      {
        id: "sicilian-exercise",
        type: "exercise",
        title: "Play the Sicilian!",
        content:
          "White just played 1.e4. Play Black's move in the Sicilian Defense!",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        correctAnswer: "c7c5",
        hints: [
          "The Sicilian doesn't mirror White's move",
          "Control the d4 square with a pawn",
        ],
      },
      {
        id: "sicilian-quiz",
        type: "quiz",
        title: "Sicilian Defense Quiz",
        content: "What is the main idea behind 1...c5 in the Sicilian Defense?",
        options: [
          { id: "a", text: "To develop the Bishop", isCorrect: false },
          { id: "b", text: "To fight for the center without mirroring White", isCorrect: true },
          { id: "c", text: "To protect the King", isCorrect: false },
          { id: "d", text: "To attack White's Queen", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "openings-queens-gambit",
    title: "Queen's Gambit",
    description: "A powerful opening starting with 1.d4 — offer a pawn for control!",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["openings-italian-game"],
    steps: [
      {
        id: "qg-intro",
        type: "explanation",
        title: "Not All Games Start with e4!",
        content:
          "The Queen's Gambit starts with 1.d4 d5 2.c4. White offers a pawn, but is it really a sacrifice? Let's find out!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "qg-demo",
        type: "demonstration",
        title: "The Gambit",
        content:
          "White plays 1.d4 d5, then offers the c-pawn with 2.c4. If Black takes, White can usually win the pawn back while getting a strong center.",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["d2d4", "d7d5", "c2c4"],
      },
      {
        id: "qg-accepted",
        type: "demonstration",
        title: "Queen's Gambit Accepted",
        content:
          "If Black takes the pawn with dxc4, White plays e3 and then Bxc4, winning the pawn back with a strong center. Black got a pawn temporarily, but White has better development.",
        fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
        moves: ["d5c4", "e2e3", "b7b5", "a2a4"],
      },
      {
        id: "qg-declined",
        type: "demonstration",
        title: "Queen's Gambit Declined",
        content:
          "Many players decline the gambit with 2...e6, keeping a solid pawn structure. This leads to strategic, positional chess.",
        fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
        moves: ["e7e6"],
      },
      {
        id: "qg-exercise",
        type: "exercise",
        title: "Play the Queen's Gambit!",
        content:
          "You're White. Black just played 1...d5. Offer the Queen's Gambit!",
        fen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
        correctAnswer: "c2c4",
        hints: [
          "Offer a pawn to challenge Black's center",
          "Which pawn attacks the d5 pawn?",
        ],
      },
      {
        id: "qg-quiz",
        type: "quiz",
        title: "Queen's Gambit Quiz",
        content: "Why is the Queen's Gambit not a true sacrifice?",
        options: [
          { id: "a", text: "Because Black can't take the pawn", isCorrect: false },
          { id: "b", text: "Because White can usually win the pawn back", isCorrect: true },
          { id: "c", text: "Because it doesn't involve a pawn", isCorrect: false },
          { id: "d", text: "Because the game always ends in a draw", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "openings-ruy-lopez",
    title: "Ruy Lopez",
    description: "The Spanish Opening — deep strategy from move 3!",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["openings-italian-game"],
    steps: [
      {
        id: "ruy-intro",
        type: "explanation",
        title: "The Spanish Game",
        content:
          "The Ruy Lopez (also called the Spanish Opening) starts like the Italian Game but puts the Bishop on b5 instead of c4. Named after a Spanish priest from the 1500s, it's one of the most strategic openings in chess!",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
      },
      {
        id: "ruy-bb5",
        type: "demonstration",
        title: "3. Bb5 — Targeting the Defender",
        content:
          "Instead of going to c4, the Bishop goes to b5. It puts pressure on the Knight that defends the e5 pawn. If the Knight moves, e5 falls!",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        moves: ["f1b5"],
      },
      {
        id: "ruy-a6",
        type: "demonstration",
        title: "The Morphy Defense",
        content:
          "Black's most common reply is 3...a6, asking the Bishop 'where are you going?' The Bishop usually retreats to a4, keeping the pressure.",
        fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
        moves: ["a7a6", "b5a4"],
      },
      {
        id: "ruy-ideas",
        type: "explanation",
        title: "Long-Term Pressure",
        content:
          "The Ruy Lopez is about long-term pressure. White doesn't win material right away but builds a position where threats grow over many moves. It teaches patience and strategic thinking!",
        fen: "r1bqkbnr/1ppp1ppp/p1n5/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 4",
      },
      {
        id: "ruy-exercise",
        type: "exercise",
        title: "Play the Ruy Lopez!",
        content:
          "After 1.e4 e5 2.Nf3 Nc6, play the Ruy Lopez move!",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        correctAnswer: "f1b5",
        hints: [
          "Target the piece that defends e5",
          "Put your Bishop on b5",
        ],
      },
      {
        id: "ruy-quiz",
        type: "quiz",
        title: "Ruy Lopez Quiz",
        content: "What is the key difference between the Italian Game (Bc4) and the Ruy Lopez (Bb5)?",
        options: [
          { id: "a", text: "Bc4 targets f7, Bb5 puts pressure on the knight defending e5", isCorrect: true },
          { id: "b", text: "There is no difference", isCorrect: false },
          { id: "c", text: "Bb5 is always better than Bc4", isCorrect: false },
          { id: "d", text: "Bc4 is only for beginners", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "openings-french-defense",
    title: "French Defense",
    description: "Lock the center and attack the pawn chain!",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["openings-italian-game"],
    steps: [
      {
        id: "french-intro",
        type: "explanation",
        title: "A Solid Wall",
        content:
          "The French Defense (1.e4 e6) is different from 1...e5. Black lets White have the center first, then attacks it! It leads to closed positions with pawn chains.",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      },
      {
        id: "french-e6",
        type: "demonstration",
        title: "Building the Chain",
        content:
          "After 1.e4 e6 2.d4 d5, we get a pawn chain: White has pawns on d4-e5 (after e5) and Black has pawns on d5-e6. The battle is about attacking these chains!",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        moves: ["e7e6", "d2d4", "d7d5"],
      },
      {
        id: "french-advance",
        type: "demonstration",
        title: "The Advance Variation",
        content:
          "If White plays 3.e5, a pawn chain forms. Black's plan is to attack the base of White's chain (the d4 pawn) with ...c5!",
        fen: "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
        moves: ["e4e5", "c7c5"],
      },
      {
        id: "french-chain",
        type: "explanation",
        title: "Attack the Base!",
        content:
          "A pawn chain is strongest at the top and weakest at the base. Black attacks the base (d4) with ...c5. White attacks the base (e6) with moves like f4-f5. This tug-of-war is what makes the French so interesting!",
        fen: "rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4",
      },
      {
        id: "french-exercise",
        type: "exercise",
        title: "Attack the Chain!",
        content:
          "You're playing Black in the French Defense. White just pushed e5. Attack the base of White's pawn chain!",
        fen: "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3",
        correctAnswer: "c7c5",
        hints: [
          "Attack the base of the chain, not the front",
          "Which pawn can attack d4?",
        ],
      },
      {
        id: "french-quiz",
        type: "quiz",
        title: "French Defense Quiz",
        content: "In a pawn chain, which part should you attack?",
        options: [
          { id: "a", text: "The front (strongest point)", isCorrect: false },
          { id: "b", text: "The base (weakest point)", isCorrect: true },
          { id: "c", text: "The middle", isCorrect: false },
          { id: "d", text: "Pawn chains can't be attacked", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "openings-kings-gambit-fried-liver",
    title: "King's Gambit & Fried Liver",
    description: "Aggressive openings that go for the attack from move 2!",
    category: "openings",
    difficulty: "intermediate",
    prerequisites: ["openings-italian-game"],
    steps: [
      {
        id: "kg-intro",
        type: "explanation",
        title: "Playing for Attack!",
        content:
          "Not all openings are slow and strategic. Some openings sacrifice material for a fast attack! The King's Gambit and the Fried Liver Attack are two of the most exciting openings in chess.",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      },
      {
        id: "kg-f4",
        type: "demonstration",
        title: "The King's Gambit — 2.f4!",
        content:
          "White sacrifices the f-pawn! If Black takes with exf4, White gets a strong center and open lines for attack. This was a favorite of famous players like Bobby Fischer.",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        moves: ["f2f4", "e5f4"],
      },
      {
        id: "kg-ideas",
        type: "explanation",
        title: "Why Sacrifice?",
        content:
          "After 2...exf4, White can play d4 and Bxf4, getting a massive pawn center and fast development. The open f-file also aims at Black's f7. Speed and activity beat material!",
        fen: "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3",
      },
      {
        id: "fl-intro",
        type: "explanation",
        title: "The Fried Liver Attack",
        content:
          "The Fried Liver starts like the Italian Game: 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6. Then White plays the shocking 4.Ng5, heading straight for f7!",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      },
      {
        id: "fl-demo",
        type: "demonstration",
        title: "The Knight Sacrifice!",
        content:
          "After 4.Ng5 d5 5.exd5 Nxd5, White plays the famous 6.Nxf7! The Knight sacrifices itself to expose the Black King. The King must take, and then it's in big trouble!",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
        moves: ["f3g5", "d7d5", "e4d5", "c6a5", "c4b5", "c7c6", "d5c6", "b7c6"],
      },
      {
        id: "kg-exercise",
        type: "exercise",
        title: "Play the King's Gambit!",
        content:
          "You're White after 1.e4 e5. Sacrifice a pawn for a fast attack!",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        correctAnswer: "f2f4",
        hints: [
          "Offer a pawn to open lines",
          "Which pawn can attack the e5 pawn?",
        ],
      },
      {
        id: "kg-quiz",
        type: "quiz",
        title: "Aggressive Openings Quiz",
        content: "Why would you sacrifice a pawn in the opening?",
        options: [
          { id: "a", text: "To lose on purpose", isCorrect: false },
          { id: "b", text: "To gain faster development and open attacking lines", isCorrect: true },
          { id: "c", text: "Because pawns are worthless", isCorrect: false },
          { id: "d", text: "To confuse your opponent", isCorrect: false },
        ],
      },
    ],
  },
];

export default openingsLessons;
```

- [ ] **Step 2: Commit**

```bash
git add src/data/lessons/openings.ts
git commit -m "feat: add 6 openings lessons (Italian, Sicilian, QG, Ruy Lopez, French, KG/Fried Liver)"
```

---

### Task 2: Create Strategy Lessons

**Files:**
- Create: `src/data/lessons/strategy.ts`

- [ ] **Step 1: Create strategy.ts with all 8 lessons**

Create `src/data/lessons/strategy.ts` with the following content:

```typescript
import type { Lesson } from "@/types";

export const strategyLessons: Lesson[] = [
  {
    id: "strategy-center-control",
    title: "Controlling the Center",
    description: "Why the middle of the board is the most important area in chess",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "center-intro",
        type: "explanation",
        title: "The Center of the Board",
        content:
          "The four squares in the middle — e4, d4, e5, d5 — are the most important squares in chess. Pieces in the center control more squares and can reach any part of the board quickly.",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "center-pawns",
        type: "demonstration",
        title: "Pawn Center",
        content:
          "The easiest way to control the center is with pawns. Pawns on e4 and d4 create a strong wall that limits where the opponent's pieces can go.",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["e2e4", "e7e5", "d2d4"],
      },
      {
        id: "center-strong",
        type: "explanation",
        title: "Strong vs Weak Center",
        content:
          "A strong center gives your pieces room to move and limits your opponent. A weak center means your opponent's pieces can invade and cause trouble.",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
      },
      {
        id: "center-demo",
        type: "demonstration",
        title: "Center Leads to Attack",
        content:
          "Watch how a strong center leads to a powerful attack. White's center pawns support the pieces as they advance toward the enemy King!",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 2 4",
        moves: ["d4d5", "c6e7", "f1d3"],
      },
      {
        id: "center-exercise",
        type: "exercise",
        title: "Claim the Center!",
        content:
          "You're White. Take control of the center with your second pawn!",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        correctAnswer: "d2d4",
        hints: [
          "You already have a pawn on e4",
          "Which other pawn can join it in the center?",
        ],
      },
      {
        id: "center-quiz",
        type: "quiz",
        title: "Center Control Quiz",
        content: "Which four squares make up the center of the board?",
        options: [
          { id: "a", text: "a1, a8, h1, h8", isCorrect: false },
          { id: "b", text: "e4, d4, e5, d5", isCorrect: true },
          { id: "c", text: "c3, c6, f3, f6", isCorrect: false },
          { id: "d", text: "e1, e8, d1, d8", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-piece-development",
    title: "Piece Development",
    description: "Get your pieces into the game quickly and efficiently!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "dev-intro",
        type: "explanation",
        title: "What is Development?",
        content:
          "Development means moving your pieces from their starting squares to active squares where they control the board. Think of it like getting your army ready for battle — you want all your soldiers in position!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "dev-rules",
        type: "explanation",
        title: "Development Rules",
        content:
          "Three golden rules: 1) Develop knights before bishops (knights have fewer good squares). 2) Don't move the same piece twice. 3) Don't bring your Queen out too early — she can be chased by smaller pieces!",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      },
      {
        id: "dev-good",
        type: "demonstration",
        title: "Good Development",
        content:
          "Watch how White develops all pieces efficiently: pawns first, then knights, then bishops, then castle! Every move has a purpose.",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["e2e4", "e7e5", "g1f3", "b8c6", "f1c4", "g8f6", "d2d3", "f8e7", "e1g1"],
      },
      {
        id: "dev-bad",
        type: "explanation",
        title: "Bad Development",
        content:
          "In this position, White moved the Queen out early and she got chased around. Meanwhile, Black developed all pieces naturally. Black is much better even though no material was lost!",
        fen: "r1b1kb1r/pppp1ppp/2n2n2/4p3/4P2q/3P4/PPP2PPP/RNBQKBNR w KQkq - 1 5",
      },
      {
        id: "dev-exercise",
        type: "exercise",
        title: "Develop Your Knight!",
        content:
          "It's White's turn. Develop a piece following the rule: knights before bishops!",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        correctAnswer: "g1f3",
        hints: [
          "Knights before bishops!",
          "Develop toward the center",
        ],
      },
      {
        id: "dev-quiz",
        type: "quiz",
        title: "Development Quiz",
        content: "Why shouldn't you bring your Queen out too early?",
        options: [
          { id: "a", text: "The Queen is too slow", isCorrect: false },
          { id: "b", text: "She can be chased by smaller pieces, wasting time", isCorrect: true },
          { id: "c", text: "The Queen can't move in the opening", isCorrect: false },
          { id: "d", text: "It's against the rules", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-king-safety",
    title: "King Safety",
    description: "Keep your King safe — castle early and protect the shelter!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "safety-intro",
        type: "explanation",
        title: "The King Must Be Safe",
        content:
          "Your King is the most important piece — if it's checkmated, you lose! The best way to keep it safe is to castle early, tucking the King behind a wall of pawns.",
        fen: "r1bqk2r/ppppbppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 6 5",
      },
      {
        id: "safety-castle",
        type: "demonstration",
        title: "Castle Early!",
        content:
          "Castling moves the King to safety and brings the Rook into play. Two benefits in one move! Try to castle within the first 10 moves.",
        fen: "r1bqk2r/ppppbppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 6 5",
        moves: ["e1g1"],
      },
      {
        id: "safety-shelter",
        type: "explanation",
        title: "Don't Weaken Your Shelter",
        content:
          "Once you castle, keep the pawns in front of your King! Moving them creates holes the opponent can use to attack. The pawns on f2, g2, h2 (or f7, g7, h7 for Black) are your King's bodyguards.",
        fen: "r1bq1rk1/ppppbppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b - - 7 5",
      },
      {
        id: "safety-attack",
        type: "demonstration",
        title: "Punishing an Unsafe King",
        content:
          "When the opponent leaves their King in the center, attack! Open the center and aim all your pieces at the King.",
        fen: "rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4",
        moves: ["d7d6", "d2d4", "e5d4", "f3d4"],
      },
      {
        id: "safety-exercise",
        type: "exercise",
        title: "Castle to Safety!",
        content:
          "Your King is still in the center. Castle to get it safe!",
        fen: "r1bqk2r/ppppbppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 2 5",
        correctAnswer: "e1g1",
        hints: [
          "The King needs to get safe",
          "Castle kingside!",
        ],
      },
      {
        id: "safety-quiz",
        type: "quiz",
        title: "King Safety Quiz",
        content: "Why should you avoid pushing the pawns in front of your castled King?",
        options: [
          { id: "a", text: "It wastes time", isCorrect: false },
          { id: "b", text: "It creates holes the opponent can use to attack", isCorrect: true },
          { id: "c", text: "Pawns can't move forward", isCorrect: false },
          { id: "d", text: "It's against the rules of castling", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-pawn-structure",
    title: "Pawn Structure",
    description: "Learn how pawn formations shape the entire game!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "pstruct-intro",
        type: "explanation",
        title: "Pawns Are the Skeleton",
        content:
          "Pawns can't move backward, so every pawn move is permanent! The way pawns are arranged — the pawn structure — shapes the whole game. Good structure supports your pieces; bad structure creates weaknesses.",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "pstruct-doubled",
        type: "explanation",
        title: "Doubled Pawns",
        content:
          "When two pawns of the same color are on the same file, they're 'doubled.' Doubled pawns are weak because they can't protect each other and they block each other from advancing.",
        fen: "4k3/8/8/8/3P4/3P4/8/4K3 w - - 0 1",
      },
      {
        id: "pstruct-isolated",
        type: "explanation",
        title: "Isolated Pawns",
        content:
          "An isolated pawn has no friendly pawns on the files next to it. It must be defended by pieces instead of pawns, which ties your pieces down to babysitting duty!",
        fen: "4k3/8/8/3p4/8/8/PP3PPP/4K3 b - - 0 1",
      },
      {
        id: "pstruct-chain",
        type: "explanation",
        title: "Pawn Chains",
        content:
          "A pawn chain is a diagonal line of pawns protecting each other. Chains are strong! Remember from the French Defense: attack the base of the chain, not the front.",
        fen: "4k3/8/4P3/3P4/2P5/8/8/4K3 w - - 0 1",
      },
      {
        id: "pstruct-demo",
        type: "demonstration",
        title: "Good vs Bad Structure",
        content:
          "White has a clean pawn structure. Black has doubled pawns on c6/c7 and an isolated pawn on a7. White's pieces have more freedom because the pawns support each other.",
        fen: "r2qkbnr/p1p2ppp/2p5/3p4/3P4/4PN2/PPP2PPP/RNBQKB1R b KQkq - 0 5",
      },
      {
        id: "pstruct-quiz",
        type: "quiz",
        title: "Pawn Structure Quiz",
        content: "What is wrong with having doubled pawns?",
        options: [
          { id: "a", text: "They are too strong", isCorrect: false },
          { id: "b", text: "They can't protect each other and block each other", isCorrect: true },
          { id: "c", text: "They automatically lose the game", isCorrect: false },
          { id: "d", text: "Nothing, doubled pawns are fine", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-open-files-rooks",
    title: "Open Files & Rooks",
    description: "Put your Rooks on open files for maximum power!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "files-intro",
        type: "explanation",
        title: "What is an Open File?",
        content:
          "An open file is a column with no pawns on it. A half-open file has only enemy pawns. Rooks love open files because they can control the entire column and invade the enemy position!",
        fen: "r4rk1/ppp2ppp/2n5/3p4/8/2N2N2/PPP2PPP/R4RK1 w - - 0 10",
      },
      {
        id: "files-rook-placement",
        type: "demonstration",
        title: "Rook on the Open File",
        content:
          "Watch White place a Rook on the open e-file. From there, it can penetrate into Black's position on the 7th or 8th rank!",
        fen: "r4rk1/ppp2ppp/2n5/3p4/8/2N2N2/PPP2PPP/R4RK1 w - - 0 10",
        moves: ["f1e1"],
      },
      {
        id: "files-doubling",
        type: "explanation",
        title: "Doubling Rooks",
        content:
          "Putting both Rooks on the same open file is called 'doubling.' Two Rooks working together on an open file are incredibly powerful — they support each other's invasion.",
        fen: "r4rk1/ppp2ppp/2n5/3p4/8/2N2N2/PPP2PPP/R3R1K1 w - - 1 11",
      },
      {
        id: "files-7th-rank",
        type: "explanation",
        title: "The 7th Rank Invasion",
        content:
          "A Rook on the 7th rank (2nd rank for Black) is devastating. It attacks pawns from behind and traps the King on the back rank. Getting a Rook to the 7th is often worth a pawn!",
        fen: "6k1/ppp1Rppp/2n5/3p4/8/2N2N2/PPP2PPP/R5K1 b - - 2 12",
      },
      {
        id: "files-exercise",
        type: "exercise",
        title: "Activate Your Rook!",
        content:
          "Place your Rook on the open e-file.",
        fen: "r3r1k1/ppp2ppp/2n5/3p4/8/2N2N2/PPP2PPP/R4RK1 w - - 0 10",
        correctAnswer: "f1e1",
        hints: [
          "Which file has no pawns on it?",
          "Put your Rook on the e-file",
        ],
      },
      {
        id: "files-quiz",
        type: "quiz",
        title: "Open Files Quiz",
        content: "Why are Rooks strongest on open files?",
        options: [
          { id: "a", text: "Because Rooks can only move on open files", isCorrect: false },
          { id: "b", text: "Because they can control the whole column and invade", isCorrect: true },
          { id: "c", text: "Because pawns are afraid of Rooks", isCorrect: false },
          { id: "d", text: "Because it's the rules", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-outposts",
    title: "Outposts",
    description: "Plant your Knight on an unshakable strong square!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "outpost-intro",
        type: "explanation",
        title: "What is an Outpost?",
        content:
          "An outpost is a square in enemy territory that can't be attacked by opponent pawns. Knights love outposts because once they sit on one, they're nearly impossible to remove!",
        fen: "r1bqkb1r/pp3ppp/2n1pn2/2pp4/3P4/2NBPN2/PPP2PPP/R1BQK2R w KQkq - 0 6",
      },
      {
        id: "outpost-knight",
        type: "explanation",
        title: "The Perfect Knight",
        content:
          "A Knight on an outpost in the center is like a fortress. It controls key squares, supports attacks, and can't be chased away by pawns. This Knight on d5 is a monster!",
        fen: "r1bqkb1r/pp3ppp/2n1pn2/2pN4/3P4/2N1PN2/PPP2PPP/R1BQKB1R b KQkq - 0 7",
      },
      {
        id: "outpost-create",
        type: "demonstration",
        title: "Creating an Outpost",
        content:
          "You create outposts by trading or advancing pawns. When the opponent no longer has pawns that can attack a square, it becomes a permanent outpost for your pieces.",
        fen: "r1bqkb1r/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6",
        moves: ["d4c5", "f8c5", "f3d4"],
      },
      {
        id: "outpost-exercise",
        type: "exercise",
        title: "Occupy the Outpost!",
        content:
          "White has a Knight that can jump to a powerful outpost on d5. No Black pawn can ever attack it there. Go for it!",
        fen: "r1bqkb1r/pp3ppp/4pn2/2p5/8/2N1PN2/PPP2PPP/R1BQKB1R w KQkq - 0 7",
        correctAnswer: "f3d4",
        hints: [
          "Look for a central square no pawn can attack",
          "The d4 square leads toward d5 — start there!",
        ],
      },
      {
        id: "outpost-quiz",
        type: "quiz",
        title: "Outposts Quiz",
        content: "What makes a square an outpost?",
        options: [
          { id: "a", text: "It's on the edge of the board", isCorrect: false },
          { id: "b", text: "It can't be attacked by enemy pawns", isCorrect: true },
          { id: "c", text: "Only Queens can use outposts", isCorrect: false },
          { id: "d", text: "It's any empty square", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-good-bad-bishop",
    title: "Good Bishop vs Bad Bishop",
    description: "Not all Bishops are equal — learn why!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "bishop-good-intro",
        type: "explanation",
        title: "Good and Bad Bishops",
        content:
          "A 'good' Bishop has its pawns on the opposite color squares, so they don't block it. A 'bad' Bishop has its pawns on the same color, blocking its diagonals. The names tell you their strength!",
        fen: "4k3/pp3ppp/4p3/3p4/3P4/4P3/PP3PPP/2B1K3 w - - 0 1",
      },
      {
        id: "bishop-bad-example",
        type: "explanation",
        title: "The Bad Bishop",
        content:
          "This White Bishop is 'bad' — it's stuck behind its own pawns on e3 and d4 (dark squares). It can barely move! Meanwhile, if Black had a light-squared Bishop, it would be 'good' because Black's pawns are on dark squares.",
        fen: "4k3/pp3ppp/4p3/3p4/3P4/2B1P3/PP3PPP/4K3 w - - 0 1",
      },
      {
        id: "bishop-good-example",
        type: "explanation",
        title: "The Good Bishop",
        content:
          "This White Bishop is 'good' — it's on a light square and its pawns are on dark squares (d4, e5). The Bishop has open diagonals and is active!",
        fen: "4k3/pp3ppp/8/3pP3/3P4/8/PP3PPP/2B1K3 w - - 0 1",
      },
      {
        id: "bishop-fix",
        type: "explanation",
        title: "Making Your Bishop Better",
        content:
          "You can improve a bad Bishop by: 1) Trading it for the opponent's good Bishop. 2) Moving your pawns to the other color. 3) Getting the Bishop outside the pawn chain before locking things up.",
        fen: "4k3/pp3ppp/4p3/3p4/3P4/1B2P3/PP3PPP/4K3 w - - 0 1",
      },
      {
        id: "bishop-exercise",
        type: "exercise",
        title: "Activate the Bishop!",
        content:
          "White's Bishop is stuck behind its pawns. Move it to an active square outside the pawn chain!",
        fen: "4k3/pp3ppp/4p3/3p4/3P4/2B1P3/PP3PPP/4K3 w - - 0 1",
        correctAnswer: "c3b4",
        hints: [
          "The Bishop needs to get outside the pawn chain",
          "Move it to a square where it's not blocked by its own pawns",
        ],
      },
      {
        id: "bishop-quiz",
        type: "quiz",
        title: "Good vs Bad Bishop Quiz",
        content: "What makes a Bishop 'bad'?",
        options: [
          { id: "a", text: "It's on the wrong side of the board", isCorrect: false },
          { id: "b", text: "Its own pawns are on the same color squares, blocking it", isCorrect: true },
          { id: "c", text: "It was captured", isCorrect: false },
          { id: "d", text: "It can't move diagonally", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "strategy-when-to-trade",
    title: "When to Trade Pieces",
    description: "Knowing when to exchange pieces is a key strategic skill!",
    category: "strategy",
    difficulty: "intermediate",
    steps: [
      {
        id: "trade-intro",
        type: "explanation",
        title: "To Trade or Not to Trade?",
        content:
          "Trading (exchanging) pieces means capturing an opponent's piece while they capture yours. Knowing WHEN to trade is one of the most important skills in chess!",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4",
      },
      {
        id: "trade-ahead",
        type: "explanation",
        title: "Trade When You're Ahead",
        content:
          "If you have more material, trade pieces! If you're up a Rook and trade all other pieces, you'll have a Rook vs nothing — an easy win. Fewer pieces make your advantage bigger.",
        fen: "4k3/8/8/8/8/8/4R3/4K3 w - - 0 1",
      },
      {
        id: "trade-attacking",
        type: "explanation",
        title: "Don't Trade When Attacking",
        content:
          "If you're building an attack on the enemy King, keep your pieces on the board! More pieces means more attackers. Trading helps the defender by reducing threats.",
        fen: "r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 6 7",
      },
      {
        id: "trade-active",
        type: "explanation",
        title: "Trade Bad Pieces for Good Ones",
        content:
          "If your opponent has a strong, active piece and you have an inactive one, try to trade them! Removing their best piece weakens their position more than losing your worst piece hurts you.",
        fen: "r1bq1rk1/ppppbppp/2n5/3Nn3/8/8/PPPPPPPP/RNBQKB1R w KQ - 0 8",
      },
      {
        id: "trade-exercise",
        type: "exercise",
        title: "Should You Trade?",
        content:
          "You're up a pawn. Your opponent offers to trade Queens. Accept the trade by capturing the Queen!",
        fen: "r1b2rk1/pppp1ppp/2n5/4p3/2B1P3/8/PPPP1qPP/RNBQ1RK1 w - - 0 10",
        correctAnswer: "d1f2",
        hints: [
          "You're ahead in material",
          "Trading pieces when ahead makes your advantage bigger",
        ],
      },
      {
        id: "trade-quiz",
        type: "quiz",
        title: "Trading Quiz",
        content: "When should you generally avoid trading pieces?",
        options: [
          { id: "a", text: "When you have more material", isCorrect: false },
          { id: "b", text: "When you're building an attack on the King", isCorrect: true },
          { id: "c", text: "When your pieces are inactive", isCorrect: false },
          { id: "d", text: "When the game just started", isCorrect: false },
        ],
      },
    ],
  },
];

export default strategyLessons;
```

- [ ] **Step 2: Commit**

```bash
git add src/data/lessons/strategy.ts
git commit -m "feat: add 8 strategy lessons (center, development, king safety, pawns, files, outposts, bishops, trading)"
```

---

### Task 3: Create Endgame Lessons

**Files:**
- Create: `src/data/lessons/endgames.ts`

- [ ] **Step 1: Create endgames.ts with all 5 lessons**

Create `src/data/lessons/endgames.ts` with the following content:

```typescript
import type { Lesson } from "@/types";

export const endgameLessons: Lesson[] = [
  {
    id: "endgame-kq-vs-k",
    title: "King & Queen vs King",
    description: "Learn the staircase method to deliver checkmate!",
    category: "endgames",
    difficulty: "intermediate",
    steps: [
      {
        id: "kqk-intro",
        type: "explanation",
        title: "The Easiest Checkmate",
        content:
          "King and Queen vs a lone King is the most basic checkmate. You must force the enemy King to the edge of the board, then deliver checkmate. The 'staircase' method makes it easy!",
        fen: "8/8/8/4k3/8/8/8/4KQ2 w - - 0 1",
      },
      {
        id: "kqk-staircase",
        type: "explanation",
        title: "The Staircase Method",
        content:
          "The Queen cuts off the King rank by rank, like walking down a staircase. First cut off the King from one side, then push it to the edge step by step.",
        fen: "8/8/8/4k3/8/4Q3/8/4K3 w - - 0 1",
      },
      {
        id: "kqk-demo",
        type: "demonstration",
        title: "Watch the Staircase",
        content:
          "The Queen pushes the King to the edge, rank by rank. Once the King is stuck on the last rank, bring your King closer to help deliver checkmate!",
        fen: "8/8/8/4k3/8/8/8/3QK3 w - - 0 1",
        moves: ["d1d4", "e5f5", "d4e4", "f5g5", "e4f4", "g5h5", "f4g4", "h5h6", "g4g5", "h6h7", "e1f2", "h7h8", "g5h6", "h8g8", "f2g3", "g8f8", "h6g6", "f8e7", "g3f4", "e7d7", "g6f6", "d7c7", "f4e5", "c7b7", "f6e6", "b7a7", "e5d5", "a7b7", "e6d6", "b7a8", "d5c6", "a8b8", "d6d8"],
      },
      {
        id: "kqk-stalemate",
        type: "explanation",
        title: "Watch Out for Stalemate!",
        content:
          "Be careful! If the enemy King has no legal moves and is NOT in check, it's stalemate — a draw! Always make sure the King has at least one square to move to until you're ready to checkmate.",
        fen: "k7/8/1K6/8/8/8/8/Q7 w - - 0 1",
      },
      {
        id: "kqk-exercise",
        type: "exercise",
        title: "Deliver Checkmate!",
        content:
          "The Black King is on the edge. Use your Queen to deliver checkmate!",
        fen: "k7/8/1K6/8/8/8/8/7Q w - - 0 1",
        correctAnswer: "h1a1",
        hints: [
          "The King is already on the edge",
          "Check the King on the a-file",
        ],
      },
      {
        id: "kqk-quiz",
        type: "quiz",
        title: "K+Q vs K Quiz",
        content: "What must you be careful about when checkmating with King and Queen?",
        options: [
          { id: "a", text: "Losing your Queen", isCorrect: false },
          { id: "b", text: "Stalemate — accidentally giving the enemy King no legal moves", isCorrect: true },
          { id: "c", text: "The King running to the center", isCorrect: false },
          { id: "d", text: "Time running out", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "endgame-kr-vs-k",
    title: "King & Rook vs King",
    description: "Master the box method to checkmate with a Rook!",
    category: "endgames",
    difficulty: "intermediate",
    steps: [
      {
        id: "krk-intro",
        type: "explanation",
        title: "The Box Method",
        content:
          "Checkmating with King and Rook is a bit harder than with a Queen, but the 'box method' makes it simple. The idea: use the Rook to create a 'box' that traps the enemy King, then shrink the box!",
        fen: "8/8/8/4k3/8/8/8/R3K3 w - - 0 1",
      },
      {
        id: "krk-cut-off",
        type: "demonstration",
        title: "Step 1: Cut Off the King",
        content:
          "First, use the Rook to cut off the enemy King. The Rook creates a wall the King can't cross. Now the King is stuck on one side of the board!",
        fen: "8/8/8/4k3/8/8/8/R3K3 w - - 0 1",
        moves: ["a1a5"],
      },
      {
        id: "krk-shrink",
        type: "explanation",
        title: "Step 2: Shrink the Box",
        content:
          "Bring your King up to help. When your King faces the enemy King with one rank between them, the Rook can safely move up one rank — shrinking the box. Repeat until the King is on the edge!",
        fen: "8/8/4k3/R7/8/8/4K3/8 w - - 0 2",
      },
      {
        id: "krk-demo",
        type: "demonstration",
        title: "The Full Technique",
        content:
          "Watch the box shrink step by step. The King helps the Rook push the enemy King to the edge, then delivers checkmate!",
        fen: "8/8/4k3/R7/8/4K3/8/8 w - - 0 3",
        moves: ["e3e4", "e6d6", "e4d4", "d6c6", "a5a6", "c6b7", "d4d5", "b7c7", "a6a7", "c7d8", "d5d6", "d8e8", "d6e6", "e8f8", "a7a8"],
      },
      {
        id: "krk-exercise",
        type: "exercise",
        title: "Shrink the Box!",
        content:
          "Your Rook has cut off the Black King. Now move your Rook to shrink the box by one rank!",
        fen: "8/4k3/8/R7/8/4K3/8/8 w - - 0 1",
        correctAnswer: "a5a6",
        hints: [
          "Move the Rook up one rank",
          "Push the wall closer to the King",
        ],
      },
      {
        id: "krk-quiz",
        type: "quiz",
        title: "K+R vs K Quiz",
        content: "What is the 'box method' in King and Rook vs King?",
        options: [
          { id: "a", text: "Using the Rook to create a wall and shrinking it until the King is on the edge", isCorrect: true },
          { id: "b", text: "Moving the King in a box pattern", isCorrect: false },
          { id: "c", text: "Putting the Rook in the corner", isCorrect: false },
          { id: "d", text: "Chasing the King with the Rook only", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "endgame-pawn-basics",
    title: "Pawn Endgames — The Basics",
    description: "Learn the opposition and when a pawn can promote!",
    category: "endgames",
    difficulty: "intermediate",
    steps: [
      {
        id: "pawn-eg-intro",
        type: "explanation",
        title: "King + Pawn vs King",
        content:
          "The most fundamental endgame! Can your pawn promote to a Queen? It depends on where the Kings are. The key concept is 'the opposition.'",
        fen: "8/8/8/4k3/8/4K3/4P3/8 w - - 0 1",
      },
      {
        id: "pawn-eg-opposition",
        type: "explanation",
        title: "What is the Opposition?",
        content:
          "Two Kings facing each other with one square between them are 'in opposition.' The side that does NOT have to move has the opposition — and the advantage! The other King must step aside.",
        fen: "8/4k3/8/4K3/8/8/4P3/8 w - - 0 1",
      },
      {
        id: "pawn-eg-winning",
        type: "demonstration",
        title: "Winning with the Opposition",
        content:
          "When the attacking King is ahead of the pawn and has the opposition, the pawn promotes! Watch: the defending King must step aside, and the pawn marches through.",
        fen: "8/4k3/8/4K3/4P3/8/8/8 w - - 0 1",
        moves: ["e5d5", "e7d7", "e4e5", "d7e7", "e5e6", "e7e8", "d5d6", "e8d8", "e6e7", "d8c7", "d6e6"],
      },
      {
        id: "pawn-eg-drawing",
        type: "demonstration",
        title: "Drawing Without the Opposition",
        content:
          "When the defending King has the opposition, it can block the pawn and force a draw. Watch: Black keeps stepping in front of the pawn!",
        fen: "4k3/8/4K3/4P3/8/8/8/8 w - - 0 1",
        moves: ["e6d6", "e8d8", "e5e6", "d8e8", "e6e7"],
      },
      {
        id: "pawn-eg-exercise",
        type: "exercise",
        title: "Take the Opposition!",
        content:
          "You're White. Move your King to take the opposition (face the Black King with one square between you).",
        fen: "8/4k3/8/8/4K3/8/4P3/8 w - - 0 1",
        correctAnswer: "e4e5",
        hints: [
          "Face the enemy King with one square between you",
          "Move your King forward toward the enemy King",
        ],
      },
      {
        id: "pawn-eg-quiz",
        type: "quiz",
        title: "Opposition Quiz",
        content: "When two Kings face each other with one square between them, who has the advantage?",
        options: [
          { id: "a", text: "The side whose turn it is to move", isCorrect: false },
          { id: "b", text: "The side who does NOT have to move", isCorrect: true },
          { id: "c", text: "The side with more pawns", isCorrect: false },
          { id: "d", text: "Neither — it's always a draw", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "endgame-passed-pawns",
    title: "Pawn Endgames — Passed Pawns",
    description: "A passed pawn is a powerful weapon in the endgame!",
    category: "endgames",
    difficulty: "intermediate",
    steps: [
      {
        id: "passed-intro",
        type: "explanation",
        title: "What is a Passed Pawn?",
        content:
          "A passed pawn is a pawn with no enemy pawns in front of it or on the adjacent files. Nothing can stop it except pieces! Passed pawns are dangerous because they threaten to promote.",
        fen: "8/8/8/3P4/8/5k2/8/4K3 w - - 0 1",
      },
      {
        id: "passed-outside",
        type: "explanation",
        title: "Outside Passed Pawns",
        content:
          "An outside passed pawn (far from the other pawns) is especially strong. It acts as a decoy — the opponent's King must chase it, leaving your King free to gobble up the remaining pawns!",
        fen: "8/8/5k2/1P3p2/5P2/8/5K2/8 w - - 0 1",
      },
      {
        id: "passed-square-rule",
        type: "explanation",
        title: "The Square Rule",
        content:
          "Can the King catch the pawn? Draw a square from the pawn to the promotion square. If the defending King can step into that square, it catches the pawn. If not, the pawn promotes!",
        fen: "8/8/8/1P6/8/8/6k1/4K3 w - - 0 1",
      },
      {
        id: "passed-demo",
        type: "demonstration",
        title: "The Decoy in Action",
        content:
          "Watch how the outside passed pawn draws the King away. White pushes the b-pawn, Black's King must chase it, and White's King eats Black's f-pawn!",
        fen: "8/8/5k2/1P3p2/5P2/8/5K2/8 w - - 0 1",
        moves: ["b5b6", "f6e7", "b6b7", "e7d7", "f2e3", "d7c7", "e3e4", "c7b7", "e4f5"],
      },
      {
        id: "passed-exercise",
        type: "exercise",
        title: "Push the Passed Pawn!",
        content:
          "You have a passed pawn on b5. Push it forward to distract the enemy King!",
        fen: "8/8/5k2/1P3p2/5P2/8/5K2/8 w - - 0 1",
        correctAnswer: "b5b6",
        hints: [
          "Your b-pawn has no enemy pawns blocking it",
          "Push it forward to force the King to chase it",
        ],
      },
      {
        id: "passed-quiz",
        type: "quiz",
        title: "Passed Pawns Quiz",
        content: "Why is an outside passed pawn especially powerful?",
        options: [
          { id: "a", text: "It's closer to promotion", isCorrect: false },
          { id: "b", text: "It acts as a decoy, drawing the King away from other pawns", isCorrect: true },
          { id: "c", text: "It can capture more pieces", isCorrect: false },
          { id: "d", text: "It's protected by the King", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "endgame-rook-endgames",
    title: "Rook Endgames",
    description: "Learn the Lucena and Philidor — the two most important endgame positions!",
    category: "endgames",
    difficulty: "intermediate",
    steps: [
      {
        id: "rook-eg-intro",
        type: "explanation",
        title: "The Most Common Endgame",
        content:
          "Rook endgames are the most common endgames in chess. Two key positions every player must know: the Lucena (how to win) and the Philidor (how to draw).",
        fen: "8/4K3/4P3/8/8/8/4k3/4R3 w - - 0 1",
      },
      {
        id: "rook-eg-lucena",
        type: "explanation",
        title: "The Lucena Position",
        content:
          "The Lucena position: your King is on the pawn's promotion square, the pawn is one step from promoting, and you have a Rook. The winning technique is called 'building a bridge'!",
        fen: "1K2R3/3P4/8/8/8/8/3rk3/8 w - - 0 1",
      },
      {
        id: "rook-eg-bridge",
        type: "demonstration",
        title: "Building the Bridge",
        content:
          "The bridge technique: 1) Move your Rook to the 4th rank. 2) Step out with your King. 3) When checked, hide behind the Rook — the 'bridge' blocks the checks!",
        fen: "1K2R3/3P4/8/8/8/8/3rk3/8 w - - 0 1",
        moves: ["e8e4", "e2d3", "b8c7", "d2c2", "c7d6", "c2d2", "d6e7", "d2e2", "e4d4", "e2e1", "d7d8q"],
      },
      {
        id: "rook-eg-philidor",
        type: "explanation",
        title: "The Philidor Position",
        content:
          "The Philidor position is how the defending side draws. Keep your Rook on the 6th rank (blocking the King from advancing). When the pawn advances to the 6th rank, go to the back rank and give checks from behind!",
        fen: "8/3K4/3P4/8/8/3r4/3k4/8 b - - 0 1",
      },
      {
        id: "rook-eg-exercise",
        type: "exercise",
        title: "Build the Bridge!",
        content:
          "You're in the Lucena position. Start building the bridge by moving your Rook to the 4th rank!",
        fen: "1K2R3/3P4/8/8/8/8/3rk3/8 w - - 0 1",
        correctAnswer: "e8e4",
        hints: [
          "The Rook needs to go to the 4th rank",
          "From there it will block checks from the enemy Rook",
        ],
      },
      {
        id: "rook-eg-quiz",
        type: "quiz",
        title: "Rook Endgames Quiz",
        content: "What is the 'bridge' technique used for?",
        options: [
          { id: "a", text: "Drawing with King and Rook vs King", isCorrect: false },
          { id: "b", text: "Winning the Lucena position by blocking checks with the Rook", isCorrect: true },
          { id: "c", text: "Attacking the opponent's King", isCorrect: false },
          { id: "d", text: "Promoting a pawn in the opening", isCorrect: false },
        ],
      },
    ],
  },
];

export default endgameLessons;
```

- [ ] **Step 2: Commit**

```bash
git add src/data/lessons/endgames.ts
git commit -m "feat: add 5 endgame lessons (K+Q, K+R, pawn basics, passed pawns, rook endgames)"
```

---

### Task 4: Create Famous Games Lessons

**Files:**
- Create: `src/data/lessons/famous-games.ts`

- [ ] **Step 1: Create famous-games.ts with all 4 lessons**

Create `src/data/lessons/famous-games.ts` with the following content:

```typescript
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
          "In 1851, Adolf Anderssen played one of the most famous games in chess history. He sacrificed a Bishop, both Rooks, and his Queen — and still won by checkmate! This game shows that piece activity can be more important than material.",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "immortal-opening",
        type: "demonstration",
        title: "A Wild Opening",
        content:
          "The game started with the King's Gambit. Anderssen sacrificed a pawn for fast development and attacking chances. Both sides played aggressively!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["e2e4", "e7e5", "f2f4", "e5f4", "f1c4", "d8h4", "e1f1", "b7b5"],
      },
      {
        id: "immortal-sacrifices",
        type: "explanation",
        title: "Sacrifice After Sacrifice",
        content:
          "Anderssen gave up material to open lines and bring pieces to attacking squares. He understood that the King's safety matters more than counting pieces. His pieces swarmed around the enemy King!",
        fen: "rnb1k1nr/p1pp1ppp/8/1pb5/2B1Pp1q/8/PPPP2PP/RNBQ1K1R w kq - 2 5",
      },
      {
        id: "immortal-finale",
        type: "explanation",
        title: "The Stunning Finale",
        content:
          "In the final position, White has far less material but every piece is aimed at the Black King. The Bishop on e7 delivers the final blow, proving that activity and coordination beat material!",
        fen: "1rb4r/pkPp3p/1b6/1Q6/8/8/PPP2B1P/2KR4 w - - 0 1",
      },
      {
        id: "immortal-quiz-1",
        type: "quiz",
        title: "Immortal Game Quiz",
        content: "What is the key lesson from the Immortal Game?",
        options: [
          { id: "a", text: "Always protect your material", isCorrect: false },
          { id: "b", text: "Piece activity and King safety can be worth more than material", isCorrect: true },
          { id: "c", text: "Never sacrifice pieces", isCorrect: false },
          { id: "d", text: "The Queen is the most important piece to keep", isCorrect: false },
        ],
      },
      {
        id: "immortal-quiz-2",
        type: "quiz",
        title: "Sacrifice Quiz",
        content: "When is it a good idea to sacrifice material?",
        options: [
          { id: "a", text: "Never, material is everything", isCorrect: false },
          { id: "b", text: "When it gives you a decisive attack or checkmate", isCorrect: true },
          { id: "c", text: "Always, sacrificing is fun", isCorrect: false },
          { id: "d", text: "Only when you're already losing", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "famous-opera-game",
    title: "The Opera Game",
    description: "Morphy vs Duke & Count (1858) — the perfect example of rapid development!",
    category: "famous-games",
    difficulty: "intermediate",
    steps: [
      {
        id: "opera-intro",
        type: "explanation",
        title: "Paul Morphy's Masterpiece",
        content:
          "Paul Morphy was perhaps the greatest natural chess talent ever. In 1858, he played a game at the Paris Opera against the Duke of Brunswick and Count Isouard. While the opponents made slow moves, Morphy developed every piece with lightning speed!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "opera-opening",
        type: "demonstration",
        title: "Morphy Develops Quickly",
        content:
          "Watch Morphy's first moves: every single move develops a piece or opens a line. Meanwhile, his opponents waste time moving the same pieces multiple times!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["e2e4", "e7e5", "g1f3", "d7d6", "d2d4", "c8g4", "d4e5", "g4f3", "d1f3", "d6e5", "f1c4", "g8f6", "f3b3"],
      },
      {
        id: "opera-pressure",
        type: "explanation",
        title: "Targeting f7",
        content:
          "Morphy's Queen on b3 and Bishop on c4 both aim at f7 — the weakest point. His opponents are already in trouble because they spent time moving pieces that should have been developing!",
        fen: "rn1qkb1r/ppp2ppp/5n2/4p3/2B5/1Q6/PPP2PPP/RNB1K2R b KQkq - 1 7",
      },
      {
        id: "opera-exercise",
        type: "exercise",
        title: "Find Morphy's Move!",
        content:
          "Morphy played a brilliant Queen move early in the game. Develop the Queen to pressure both b7 and f7!",
        fen: "rn1qkb1r/ppp2ppp/5n2/4p3/2B5/5Q2/PPP2PPP/RNB1K2R w KQkq - 0 7",
        correctAnswer: "f3b3",
        hints: [
          "The Queen should attack two weaknesses at once",
          "Where can the Queen hit both b7 and f7?",
        ],
      },
      {
        id: "opera-finale",
        type: "explanation",
        title: "The Beautiful Finish",
        content:
          "Morphy finished the game with a Rook sacrifice! After 16.Qb8+!! Nxb8 17.Rd8#, the Rook delivers checkmate on the back rank. All of Morphy's pieces worked together while his opponents' pieces sat idle on the back rank.",
        fen: "1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17",
      },
      {
        id: "opera-quiz",
        type: "quiz",
        title: "Opera Game Quiz",
        content: "What is the main lesson from the Opera Game?",
        options: [
          { id: "a", text: "The Queen should come out first", isCorrect: false },
          { id: "b", text: "Rapid, efficient development leads to a winning attack", isCorrect: true },
          { id: "c", text: "Always trade pieces early", isCorrect: false },
          { id: "d", text: "Only Rooks matter in chess", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "famous-kasparov-immortal",
    title: "Kasparov's Immortal",
    description: "Kasparov vs Topalov (1999) — a modern attacking masterpiece!",
    category: "famous-games",
    difficulty: "intermediate",
    steps: [
      {
        id: "kasp-intro",
        type: "explanation",
        title: "The Greatest Player's Greatest Game",
        content:
          "Garry Kasparov is considered by many to be the greatest chess player ever. In 1999, he played a game against Veselin Topalov that featured an incredible Rook sacrifice and deep calculation. It's called 'Kasparov's Immortal!'",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "kasp-sacrifice",
        type: "explanation",
        title: "The Stunning Rook Sacrifice",
        content:
          "On move 24, Kasparov played Rxd4!! — sacrificing a whole Rook! The point was that even though he was down material, his remaining pieces created an unstoppable attack against Topalov's King.",
        fen: "4rr2/2p2ppk/1p1p3p/1q1Bb3/4P3/1Q3P2/PPP3PP/2KR3R w - - 0 24",
      },
      {
        id: "kasp-key-idea",
        type: "explanation",
        title: "Combination of Tactics and Strategy",
        content:
          "What makes this game special is that Kasparov combined long-term strategic ideas with brilliant tactical sacrifices. He saw many moves ahead and calculated that his pieces would overwhelm the opponent despite being down material.",
        fen: "4rr2/2p2ppk/1p1p3p/1q1Bb3/3RP3/1Q3P2/PPP3PP/2K4R b - - 0 24",
      },
      {
        id: "kasp-lesson",
        type: "explanation",
        title: "What We Learn",
        content:
          "Kasparov's Immortal teaches us that chess is about piece coordination and King safety, not just counting material. When all your pieces work together toward one goal — attacking the King — amazing things happen!",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "kasp-quiz",
        type: "quiz",
        title: "Kasparov's Immortal Quiz",
        content: "What makes Kasparov's game against Topalov so special?",
        options: [
          { id: "a", text: "He won without losing any pieces", isCorrect: false },
          { id: "b", text: "He combined deep strategy with a brilliant Rook sacrifice", isCorrect: true },
          { id: "c", text: "He checkmated in 10 moves", isCorrect: false },
          { id: "d", text: "He only used pawns", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: "famous-game-of-century",
    title: "The Game of the Century",
    description: "Fischer vs Byrne (1956) — a 13-year-old's stunning Queen sacrifice!",
    category: "famous-games",
    difficulty: "intermediate",
    steps: [
      {
        id: "century-intro",
        type: "explanation",
        title: "A 13-Year-Old Genius",
        content:
          "In 1956, Bobby Fischer was just 13 years old when he played a game so brilliant it was called 'The Game of the Century.' He sacrificed his Queen against a strong master — and won! If you're young and learning chess, remember: Fischer was once your age too.",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "century-setup",
        type: "explanation",
        title: "Setting Up the Sacrifice",
        content:
          "Fischer (playing Black) built up his position patiently. He developed all his pieces to active squares, targeting White's weak dark squares. Then came the stunning blow!",
        fen: "r2q1rk1/pp2nppp/2p1bn2/2Pp4/1b1P4/2N1PN2/PP2BPPP/R1BQ1RK1 b - - 0 11",
      },
      {
        id: "century-queen-sac",
        type: "demonstration",
        title: "The Queen Sacrifice!",
        content:
          "Fischer played Be6!! and after White captured the Queen, Fischer's minor pieces created an unstoppable attack. Sometimes a Bishop, Knight, and coordination are worth more than a Queen!",
        fen: "r2q1rk1/pp2nppp/2p2b2/3Pb3/1B1n4/2N1PN2/PP3PPP/R1BQ1RK1 b - - 0 15",
        moves: ["d4c2"],
      },
      {
        id: "century-lesson",
        type: "explanation",
        title: "The Power of Piece Coordination",
        content:
          "Fischer's pieces worked together like a team. His Bishops controlled the diagonals, his Knights jumped to powerful squares, and White's extra Queen couldn't save the game. Coordination beat material!",
        fen: "r4rk1/pp2nppp/2p2b2/3Pb3/8/4PN2/PP1n1PPP/R1BQ1RK1 w - - 0 17",
      },
      {
        id: "century-exercise",
        type: "exercise",
        title: "Find the Key Move!",
        content:
          "Fischer's Knight can jump to a devastating square. Find the move that forks White's Rook and creates chaos in White's position!",
        fen: "r4rk1/pp2nppp/2p2b2/3Pb3/1B6/4PN2/PP1n1PPP/R1BQ1RK1 b - - 0 16",
        correctAnswer: "d2c4",
        hints: [
          "The Knight can jump to attack multiple targets",
          "Look for a square that threatens the Bishop and controls key squares",
        ],
      },
      {
        id: "century-quiz",
        type: "quiz",
        title: "Game of the Century Quiz",
        content: "What is the main lesson from Fischer's Game of the Century?",
        options: [
          { id: "a", text: "The Queen is always the most important piece", isCorrect: false },
          { id: "b", text: "Piece coordination can be more powerful than material advantage", isCorrect: true },
          { id: "c", text: "Never sacrifice your Queen", isCorrect: false },
          { id: "d", text: "Only grandmasters can play great chess", isCorrect: false },
        ],
      },
    ],
  },
];

export default famousGamesLessons;
```

- [ ] **Step 2: Commit**

```bash
git add src/data/lessons/famous-games.ts
git commit -m "feat: add 4 famous games lessons (Immortal, Opera, Kasparov's Immortal, Game of Century)"
```

---

### Task 5: Update Lessons Index

**Files:**
- Modify: `src/data/lessons/index.ts`

- [ ] **Step 1: Update index.ts to import and export all lesson arrays**

Replace the contents of `src/data/lessons/index.ts` with:

```typescript
import { beginnerLessons } from "./beginner";
import { tacticsLessons } from "./tactics";
import { openingsLessons } from "./openings";
import { strategyLessons } from "./strategy";
import { endgameLessons } from "./endgames";
import { famousGamesLessons } from "./famous-games";
import type { Lesson, LessonCategory } from "@/types";

export const allLessons: Lesson[] = [
  ...beginnerLessons,
  ...tacticsLessons,
  ...openingsLessons,
  ...strategyLessons,
  ...endgameLessons,
  ...famousGamesLessons,
];

export const getLessonById = (id: string): Lesson | undefined => {
  return allLessons.find((lesson) => lesson.id === id);
};

export const getLessonsByCategory = (category: LessonCategory): Lesson[] => {
  return allLessons.filter((lesson) => lesson.category === category);
};

export const getBeginnerLessons = (): Lesson[] => {
  return allLessons.filter((lesson) => lesson.difficulty === "beginner");
};

export const getTacticsLessons = (): Lesson[] => {
  return allLessons.filter((lesson) => lesson.category === "tactics");
};

export {
  beginnerLessons,
  tacticsLessons,
  openingsLessons,
  strategyLessons,
  endgameLessons,
  famousGamesLessons,
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/lessons/index.ts
git commit -m "feat: register all new lesson categories in lessons index"
```

---

### Task 6: Update Lessons Screen

**Files:**
- Modify: `app/(tabs)/lessons.tsx`

- [ ] **Step 1: Update the lessons screen to show all 6 categories**

Replace the contents of `app/(tabs)/lessons.tsx` with:

```typescript
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  beginnerLessons,
  tacticsLessons,
  openingsLessons,
  strategyLessons,
  endgameLessons,
  famousGamesLessons,
} from "@/data/lessons";
import { useUserStore } from "@/stores/useUserStore";
import { colors, spacing, fontSize, fontWeight, borderRadius } from "@/utils/theme";
import type { Lesson, Difficulty } from "@/types";

interface LessonCardProps {
  lesson: Lesson;
  completed: boolean;
  onPress: () => void;
}

function LessonCard({ lesson, completed, onPress }: LessonCardProps) {
  const difficultyColor: Record<Difficulty, string> = {
    beginner: colors.success,
    intermediate: colors.secondary,
    advanced: colors.error,
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{lesson.title}</Text>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: difficultyColor[lesson.difficulty] },
          ]}
        >
          <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{lesson.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.stepCount}>{lesson.steps.length} steps</Text>
        {completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const sections = [
  {
    title: "Beginner",
    subtitle: "Learn how each piece moves",
    lessons: beginnerLessons,
  },
  {
    title: "Tactics",
    subtitle: "Winning combinations and tricks",
    lessons: tacticsLessons,
  },
  {
    title: "Openings",
    subtitle: "Start your games with confidence",
    lessons: openingsLessons,
  },
  {
    title: "Strategy",
    subtitle: "Think like a chess player",
    lessons: strategyLessons,
  },
  {
    title: "Endgames",
    subtitle: "Finish the game like a pro",
    lessons: endgameLessons,
  },
  {
    title: "Famous Games",
    subtitle: "Learn from the greatest games ever played",
    lessons: famousGamesLessons,
  },
];

export default function LessonsScreen() {
  const router = useRouter();
  const progress = useUserStore((state) => state.progress);

  const isLessonCompleted = (lessonId: string): boolean => {
    return progress?.completedLessons.includes(lessonId) ?? false;
  };

  const handleLessonPress = (lessonId: string) => {
    router.push(`/lesson/${lessonId}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chess Lessons</Text>
          <Text style={styles.headerSubtitle}>
            Master chess step by step with fun, interactive lessons
          </Text>
        </View>

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>
            {section.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                completed={isLessonCompleted(lesson.id)}
                onPress={() => handleLessonPress(lesson.id)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    fontSize: fontSize.xs,
    color: colors.textInverse,
    fontWeight: fontWeight.medium,
    textTransform: "capitalize",
  },
  cardDescription: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepCount: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  completedBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  completedText: {
    fontSize: fontSize.xs,
    color: colors.textInverse,
    fontWeight: fontWeight.medium,
  },
});
```

- [ ] **Step 2: Verify the app compiles**

Run: `npx expo export --platform ios 2>&1 | head -20`
Expected: No TypeScript errors related to lesson imports.

- [ ] **Step 3: Commit**

```bash
git add app/\(tabs\)/lessons.tsx
git commit -m "feat: update lessons screen to display all 6 categories in progression order"
```

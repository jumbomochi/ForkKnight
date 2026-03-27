# Curriculum Expansion Design

Expand the ForkKnight lesson curriculum from 10 lessons (Beginner + Tactics) to 33 lessons across 6 categories, targeting ages 9-12.

## Curriculum Structure

All categories are accessible without unlock gates (unlock logic deferred to future work). Displayed in recommended progression order on the lessons screen.

| Stage | Category | Lessons | Status |
|-------|----------|---------|--------|
| 1 | Beginner | 6 | Existing |
| 2 | Tactics | 4 | Existing |
| 3 | Openings | 6 | New |
| 4 | Strategy | 8 | New |
| 5 | Endgames | 5 | New |
| 6 | Famous Games | 4 | New |

All lessons use existing step types: explanation, demonstration, exercise, quiz.

---

## Openings Lessons (6)

### 1. Italian Game
- Why it's played, development principles it teaches
- Main line: 1.e4 e5 2.Nf3 Nc6 3.Bc4
- Key ideas: targeting f7, quick development, center control
- Exercise: find the correct developing moves
- Quiz: why Bc4 instead of other squares

### 2. Sicilian Defense
- Why Black plays c5 instead of e5
- Open Sicilian basics: 1.e4 c5 2.Nf3 d6 3.d4
- Key ideas: asymmetric play, fighting for the center indirectly
- Exercise: play Black's key moves in the opening

### 3. Queen's Gambit
- 1.d4 d5 2.c4 — is it a real sacrifice?
- Accepted vs Declined basics
- Key ideas: pawn center control, piece pressure
- Exercise: decide whether to accept or decline

### 4. Ruy Lopez
- 1.e4 e5 2.Nf3 Nc6 3.Bb5
- Why attack the knight defending e5?
- Key ideas: long-term pressure, strategic depth
- Exercise: find correct responses as Black

### 5. French Defense
- 1.e4 e6 — locking the center
- Pawn chain concept (d5-e6 vs d4-e5)
- Key ideas: closed positions, attacking the base of a chain
- Exercise: identify pawn structure strengths/weaknesses

### 6. King's Gambit & Fried Liver
- Aggressive openings for fun
- King's Gambit: 1.e4 e5 2.f4 — sacrificing for rapid development
- Fried Liver: the famous knight sacrifice on f7
- Exercise: execute the Fried Liver attack

---

## Strategy Lessons (8)

### Tier 1 — Core Positional Ideas

### 1. Controlling the Center
- Why e4/d4/e5/d5 are the most important squares
- Pawn center vs piece control of center
- Demo: strong center leading to attack
- Exercise: choose moves that fight for the center

### 2. Piece Development
- Develop knights before bishops, connect rooks
- Don't move the same piece twice in the opening
- Demo: well-developed position vs undeveloped one
- Exercise: find the best developing move

### 3. King Safety
- When and why to castle
- Pawn shelter — don't push pawns in front of your king
- Demo: attack against an uncastled king
- Exercise: spot the unsafe king position

### 4. Pawn Structure
- Doubled pawns, isolated pawns, pawn chains
- How pawn structure shapes the game
- Demo: strong vs weak pawn structures
- Quiz: identify the pawn weakness

### Tier 2 — Intermediate Strategy

### 5. Open Files & Rooks
- Rooks belong on open and half-open files
- Doubling rooks, 7th rank invasion
- Exercise: find the best file for your rook

### 6. Outposts
- What makes a strong square for a knight
- How pawns create and prevent outposts
- Exercise: identify the outpost and occupy it

### 7. Good Bishop vs Bad Bishop
- Pawns on same color = bad bishop
- How to make your bishop good (or your opponent's bad)
- Exercise: identify which side has the better bishop

### 8. When to Trade Pieces
- Simplify when ahead in material
- Keep pieces on when attacking
- Quiz: should you trade or keep tension?

---

## Endgame Lessons (5)

### 1. King & Queen vs King
- Using the queen to force the king to the edge
- Staircase method
- Demo: step-by-step mating technique
- Exercise: deliver checkmate in a few moves

### 2. King & Rook vs King
- Box method — cut off the king
- Using your king to help the rook
- Demo: full mating sequence
- Exercise: find the next move in the technique

### 3. Pawn Endgames — The Basics
- King and pawn vs king — when does the pawn promote?
- The opposition — what it is and why it matters
- Demo: winning vs drawing with opposition
- Exercise: find the winning/drawing king move

### 4. Pawn Endgames — Passed Pawns
- Creating and supporting a passed pawn
- Outside passed pawns as a decoy
- The square rule — can the king catch the pawn?
- Exercise: calculate if the pawn promotes

### 5. Rook Endgames
- Lucena position — the bridge technique
- Philidor position — how to draw
- Rook behind the passed pawn
- Exercise: set up the bridge

---

## Famous Games Lessons (4)

### 1. The Immortal Game (Anderssen vs Kieseritzky, 1851)
- Wild sacrificial attacking chess
- Anderssen gives up both rooks and a bishop for checkmate
- Key theme: piece activity over material
- Quiz: why did the sacrifices work?

### 2. The Opera Game (Morphy vs Duke & Count, 1858)
- The perfect example of rapid development
- Morphy develops every piece while opponents waste time
- Key theme: development and open lines win games
- Exercise: find Morphy's key moves

### 3. Kasparov vs Topalov, 1999 ("Kasparov's Immortal")
- Modern attacking masterpiece
- Brilliant rook sacrifice and deep calculation
- Key theme: combining tactics with positional play
- Quiz: what makes this combination work?

### 4. Bobby Fischer vs Donald Byrne, 1956 ("The Game of the Century")
- Played when Fischer was 13 — relatable for the target age group
- Queen sacrifice leading to a winning attack
- Key theme: sometimes the best move is the most surprising one
- Exercise: find Fischer's famous queen sacrifice

---

## UI Changes

### Lessons Screen
- Display 6 sections in progression order: Beginner, Tactics, Openings, Strategy, Endgames, Famous Games
- Each section shows lesson cards (same as current design)
- No lock/unlock UI — everything accessible
- Add subtle visual indicator of recommended progression (numbered stages or connecting line)

### No New Components
- All step types (explanation, demonstration, exercise, quiz) already supported by LessonViewer
- No new component work required for this phase

---

## Out of Scope (Future Work)
- Unlock/progression gating between categories
- "Play along" mode (student plays one side through an opening line)
- Annotated full game walkthrough mode (move-by-move with commentary)
- London System as standalone lesson
- Tier 3 strategy lessons (planning, weak squares, attack patterns, defense)
- Advanced difficulty level

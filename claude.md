# ForkKnight - Chess Tutor for Kids

A mobile application designed to teach young children (ages 5-12) how to play chess through interactive lessons and puzzles.

## Project Overview

ForkKnight makes learning chess fun and accessible for children by combining:
- **Structured lessons** inspired by classic chess literature (Kasparov, Fischer, Capablanca, etc.)
- **Interactive puzzles** similar to Lichess tactics trainer
- **Child-friendly UI** with colorful graphics, animations, and encouraging feedback
- **Progress tracking** to keep young learners motivated

## Tech Stack

### Mobile Framework
- **React Native** with Expo - cross-platform (iOS/Android), large ecosystem, hot reloading for development
- Alternative: Flutter if performance becomes critical

### Chess Engine & Logic
- **chess.js** - move validation, game state management
- **Stockfish WASM** - puzzle validation and hint generation (runs locally)

### Backend
- **Supabase** - authentication, database, real-time features
  - PostgreSQL for storing user progress, puzzle data, lesson content
  - Row-level security for child safety

### State Management
- **Zustand** - lightweight, simple API suitable for this app's complexity

## Project Structure

```
src/
├── components/
│   ├── board/           # Chessboard rendering, piece animations
│   ├── lessons/         # Lesson UI components
│   ├── puzzles/         # Puzzle interface components
│   └── common/          # Buttons, modals, progress bars
├── screens/
│   ├── HomeScreen.tsx
│   ├── LessonsScreen.tsx
│   ├── PuzzleScreen.tsx
│   ├── ProgressScreen.tsx
│   └── SettingsScreen.tsx
├── services/
│   ├── chess/           # Chess logic wrappers
│   ├── puzzles/         # Puzzle fetching and validation
│   └── storage/         # Local and remote data persistence
├── data/
│   ├── lessons/         # Lesson content (JSON/MDX)
│   └── puzzles/         # Puzzle database
├── hooks/               # Custom React hooks
├── utils/               # Helper functions
└── types/               # TypeScript definitions
```

## Key Features

### 1. Lessons Module
Structured curriculum progressing from basics to intermediate:
- **Beginner**: Piece movement, board setup, check/checkmate concepts
- **Foundations**: Basic tactics (forks, pins, skewers), opening principles
- **Intermediate**: Famous games analysis, positional concepts

Each lesson includes:
- Animated demonstrations
- Interactive "try it yourself" exercises
- Quiz questions
- Rewards/badges on completion

### 2. Puzzle Module
- Daily puzzles appropriate for skill level
- Themed puzzle sets (e.g., "Knight Forks", "Back Rank Mates")
- Hint system with progressive reveals
- Rating system to match difficulty to player skill

### 3. Progress & Gamification
- XP and leveling system
- Achievement badges
- Streak tracking
- Parent dashboard for monitoring progress

## Design Guidelines

### Child-Friendly UI Principles
- Large touch targets (minimum 48x48dp)
- High contrast, readable fonts
- Positive reinforcement (no harsh failure states)
- Audio feedback for moves and achievements
- Minimal text, maximum visual guidance

### Accessibility
- Support for colorblind-friendly piece sets
- VoiceOver/TalkBack compatibility
- Adjustable animation speeds

## Data Sources

### Puzzles
- Lichess puzzle database (CC0 license) - https://database.lichess.org/#puzzles
- Filter for appropriate difficulty (rating 400-1500)

### Lesson Content
- Original content inspired by classic texts (not direct copying)
- Public domain games for analysis

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android

# Run tests
npm test

# Type checking
npm run typecheck

# Lint
npm run lint
```

## Environment Variables

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

## Content Guidelines

When creating lesson content:
- Use simple, encouraging language appropriate for ages 5-12
- Break complex concepts into small, digestible steps
- Include plenty of visual examples
- Celebrate small wins frequently
- Avoid competitive pressure language

## Safety & Privacy (COPPA Compliance)

- No direct communication between users
- Parental consent required for account creation
- Minimal data collection
- No behavioral advertising
- Clear privacy policy

## Future Considerations

- Offline mode for lessons and downloaded puzzles
- Multiplayer mode (parent vs child)
- AR mode for physical board recognition
- Integration with chess.com/lichess accounts (with parental approval)

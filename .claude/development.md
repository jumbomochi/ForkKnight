# Development Guide

## Tech Stack

### Mobile Framework
- **React Native** with Expo - cross-platform (iOS/Android), large ecosystem, hot reloading for development
- Alternative: Flutter if performance becomes critical

### Chess Engine & Logic
- **chess.js** - move validation, game state management
- **Stockfish 17.1** - bundled as a local Expo native module at `modules/expo-stockfish/`, wired via UCI over a bridge. Used for Play vs Computer and in-game hints. See `docs/superpowers/specs/2026-05-25-stockfish-integration-design.md` for the design.

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

## Commands

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

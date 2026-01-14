# ForkKnight

A mobile application designed to teach young children (ages 5-12) how to play chess through interactive lessons and puzzles.

## Features

### Lessons
Structured curriculum from Beginner to Intermediate, inspired by classic chess literature (Kasparov, Fischer, Capablanca):
- Animated demonstrations
- Interactive exercises
- Quiz questions
- Rewards and badges on completion

### Puzzles
- Daily puzzles matched to skill level
- Themed puzzle sets (Knight Forks, Back Rank Mates, etc.)
- Progressive hint system
- Adaptive difficulty rating

### Progress Tracking
- XP and leveling system
- Achievement badges
- Streak tracking
- Parent dashboard

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: Zustand
- **Chess Logic**: chess.js
- **Backend**: Supabase
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/jumbomochi/ForkKnight.git
cd ForkKnight

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

## Development

```bash
# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run typecheck
```

## Project Structure

```
├── app/              # Expo Router screens
│   ├── (tabs)/       # Tab navigation screens
│   └── lesson/       # Lesson screens
├── src/
│   ├── components/   # Reusable UI components
│   ├── data/         # Static data and content
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API and external services
│   ├── stores/       # Zustand state stores
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
└── assets/           # Images, fonts, and other assets
```

## License

This project is private and not licensed for public use.

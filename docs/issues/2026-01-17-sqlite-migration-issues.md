# SQLite Migration Issues

**Date:** 2026-01-17
**Status:** Paused
**Branch:** main

## Summary

The SQLite puzzle migration was implemented but encountered runtime errors on iOS. Development paused to allow parallel "Play vs Computer" feature work to continue.

## Issues Found

### Issue 1: Worklets Thread Error

**Error:**
```
[Worklets] Tried to synchronously call a non-worklet function `getSquareFromPosition` on the UI thread.
```

**Location:** `src/components/board/ChessBoard.tsx:110`

**Cause:** The `getSquareFromPosition` function is being called from within an animated/worklet context (react-native-reanimated) but isn't marked as a worklet.

**Fix:** Add `'worklet';` directive to `getSquareFromPosition` function, or restructure to avoid calling it from the UI thread.

**Reference:** https://docs.swmansion.com/react-native-worklets/docs/guides/troubleshooting#tried-to-synchronously-call-a-non-worklet-function-on-the-ui-thread

---

### Issue 2: SQLite Insert Error (Previously Fixed)

**Error:**
```
Calling the 'finalizeAsync' function has failed
Caused by: Error code 20: datatype mismatch
```

**Location:** `src/services/database/DatabaseService.ts:insertPuzzles`

**Cause:** The prepared statement API (`prepareAsync`/`executeAsync`/`finalizeAsync`) had issues with parameter binding.

**Fix Applied:** Replaced prepared statements with `runAsync` for each insert. May need further optimization for large datasets.

---

## Files Changed

- `src/services/database/DatabaseService.ts` - Created for SQLite wrapper
- `src/services/database/index.ts` - Export file
- `src/services/puzzles/PuzzleService.ts` - Updated to async SQLite queries
- `src/hooks/useAppInitialization.ts` - Added database initialization
- `app/(tabs)/puzzles.tsx` - Updated for async puzzle loading
- `assets/puzzles.json` - Puzzles exported for seeding
- Deleted: `src/data/puzzles/` (old hardcoded puzzles)
- Deleted: `src/__tests__/puzzles.test.ts`, `src/__tests__/PuzzleService.test.ts`

## Commits Made

1. `feat: add expo-sqlite dependency`
2. `feat: add puzzles.json for SQLite seeding`
3. `feat: add DatabaseService for SQLite puzzle storage`
4. `feat: update PuzzleService to use SQLite`
5. `feat: initialize database on app launch`
6. `feat: update puzzle screen for async SQLite queries`
7. `chore: remove hardcoded puzzle data (now in SQLite)`

## Next Steps

1. Fix worklets error in ChessBoard.tsx
2. Verify SQLite seeding works after worklets fix
3. Test puzzle loading and solving flow
4. Consider adding error boundaries for graceful failure
5. Add integration tests for SQLite operations

## Notes

- Web platform not supported (expo-sqlite is native-only)
- iOS prebuild was generated (`ios/` directory)
- expo-dev-client was installed during debugging

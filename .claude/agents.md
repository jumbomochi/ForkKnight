# Review Agents

## UI/UX Reviewer Agent

When asked to perform a UI/UX review, act as a specialized reviewer focused on child-friendly mobile design. Review the codebase with these priorities:

### Child-Friendly Design Checklist
- [ ] Touch targets are at least 48x48dp
- [ ] Colors have sufficient contrast (WCAG AA minimum)
- [ ] Fonts are readable and appropriately sized for children
- [ ] No harsh failure states - all feedback is encouraging
- [ ] Progress indicators are clear and motivating
- [ ] Animations are smooth but not distracting
- [ ] Icons and imagery are intuitive for ages 5-12

### Accessibility Review
- [ ] VoiceOver/TalkBack labels are present and descriptive
- [ ] Colorblind-friendly alternatives are available
- [ ] Animation speeds are adjustable or respect reduced motion settings
- [ ] Focus order is logical for screen readers

### Interaction Patterns
- [ ] Drag-and-drop has clear visual feedback
- [ ] Tap feedback is immediate and obvious
- [ ] Error recovery is simple and guided
- [ ] Navigation is intuitive and consistent

### Age-Appropriate Content
- [ ] Language is simple and encouraging (ages 5-12)
- [ ] Visual guidance is prioritized over text
- [ ] Celebratory feedback is frequent but not overwhelming
- [ ] No competitive pressure or negative messaging

### Output Format
Provide findings organized by severity (Critical, Important, Suggestion) with specific file locations and recommended fixes.

---

## Code Reviewer Agent

When asked to perform a code review, act as a specialized reviewer focused on React Native/Expo best practices and this project's specific requirements. Review with these priorities:

### React Native / Expo Best Practices
- [ ] Components are properly typed with TypeScript
- [ ] Props have appropriate default values
- [ ] Memo/useMemo/useCallback used appropriately (not over-optimized)
- [ ] Platform-specific code is properly handled
- [ ] Expo SDK features are used correctly

### State Management (Zustand)
- [ ] Store slices are properly separated
- [ ] Actions are pure and predictable
- [ ] Selectors are used to prevent unnecessary re-renders
- [ ] Persistence is handled correctly for progress data

### Chess Logic
- [ ] chess.js integration is type-safe
- [ ] Move validation happens before UI updates
- [ ] Game state is properly synchronized with UI
- [ ] FEN/PGN handling is correct

### Testing
- [ ] Components have appropriate test coverage
- [ ] Chess logic edge cases are tested
- [ ] Mocks are used appropriately for external dependencies
- [ ] Tests are meaningful, not just for coverage

### Performance
- [ ] Large lists use FlatList/VirtualizedList
- [ ] Images are optimized and cached
- [ ] Animations use native driver where possible
- [ ] Memory leaks are prevented (cleanup in useEffect)

### Security & COPPA Compliance
- [ ] No unnecessary data collection
- [ ] User input is sanitized
- [ ] No external tracking or analytics without consent
- [ ] Parent-gated features are properly protected

### Code Quality
- [ ] Functions are single-purpose and readable
- [ ] Magic numbers/strings are extracted as constants
- [ ] Error handling is appropriate (not excessive)
- [ ] No dead code or unused imports

### Output Format
Provide findings organized by category with specific file:line references, code snippets, and suggested fixes. Prioritize issues that could cause bugs or security concerns over style preferences.

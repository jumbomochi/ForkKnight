# Flutter DevContainer for Chess Tutor App

## What's Included

- **Flutter SDK**: Stable channel
- **Dart SDK**: Bundled with Flutter
- **VS Code Extensions**:
  - Dart & Flutter official extensions
  - Flutter snippets and helpers
  - Dart data class generator
  - Cline (Claude Code) - AI coding assistant

## Getting Started

1. **Open in DevContainer**: 
   - Open this folder in VS Code
   - Click "Reopen in Container" when prompted
   - Or use Command Palette: `Dev Containers: Reopen in Container`

2. **Verify Installation**:
   ```bash
   flutter doctor
   ```

3. **Create Flutter Project** (if not already created):
   ```bash
   flutter create chess_tutor
   cd chess_tutor
   ```

4. **Run on Web** (for development):
   ```bash
   flutter run -d web-server --web-port 9100
   ```

## Testing on iPad

Since you're developing for iPad, you'll need to:

1. **Build for iOS** (requires macOS with Xcode):
   ```bash
   flutter build ios
   ```

2. **Alternative**: Use Flutter web for initial development and testing in browser

3. **For iPad deployment**, you'll eventually need to run the iOS build commands on your host macOS (outside container) since Xcode requires macOS.

## Useful Commands

- `flutter create <app_name>` - Create new Flutter app
- `flutter pub add <package>` - Add a dependency
- `flutter pub get` - Install dependencies
- `flutter run` - Run the app
- `flutter test` - Run tests
- `flutter build web` - Build for web
- `flutter doctor` - Check setup

## Development Workflow

The devcontainer is ideal for:
- Writing Flutter/Dart code
- Running on web for rapid testing
- Installing and managing packages
- Running unit tests

For iPad deployment, you'll use your host macOS to:
- Build iOS app with Xcode
- Sign and deploy to App Store
- Test on physical iPad devices

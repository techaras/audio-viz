# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native application called "audio-viz" that allows users to record audio and create visual art from their voice. The app uses:
- Expo Router for file-based navigation
- Clerk for authentication
- Convex as the backend/database
- NativeWind (Tailwind) for styling
- @siteed/expo-audio-studio for audio recording
- @gorhom/bottom-sheet for modal UI components

## Development Commands

```bash
# Start the development server
npm start
# or
expo start

# Run on specific platforms
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser

# Linting
npm run lint       # Uses expo lint (ESLint)

# Reset project structure (moves starter code to app-example)
npm run reset-project
```

## Architecture

### Navigation Structure (Expo Router)
- `app/_layout.tsx` - Root layout with all providers (Clerk, Convex, GestureHandler, BottomSheet)
- `app/(home)/` - Protected routes for authenticated users
- `app/(auth)/` - Authentication routes (sign-in, sign-up)
- Uses file-based routing with typed routes enabled

### Authentication Flow
- Clerk handles authentication with token caching via expo-secure-store
- Convex is configured to work with Clerk JWT tokens via `convex/auth.config.ts`
- Auth state is managed through Clerk's `<Authenticated>` and `<Unauthenticated>` components from convex/react
- The app requires `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_JWT_ISSUER_DOMAIN` environment variables

### Audio Recording System
The app implements zero-latency recording using a preparation pattern:

1. **RecordingPreparer** component wraps authenticated screens and pre-initializes the recording system
2. **useRecording** hook (`hooks/useRecording.ts`) manages recording state with these methods:
   - `prepare()` - Pre-initializes recording to eliminate startup delay
   - `start()` - Begins recording with the prepared configuration
   - `stop()` - Stops recording and returns the audio file
   - `isRecording`, `isPrepared`, `duration` - State tracking

3. Recording configuration (in `useRecording`):
   - Sample rate: 44100 Hz
   - Channels: 1 (mono)
   - Bit depth: 16
   - Output format: WAV

4. **RecordingSheet** is a bottom sheet modal that:
   - Auto-starts recording when opened
   - Displays a timer during recording
   - Auto-closes when recording stops
   - Uses `@gorhom/bottom-sheet` for the modal UI

### Component Organization
- `components/` contains reusable UI components
- `AuthenticatedHome.tsx` is the main authenticated screen showing user greeting and record button
- `RecordButton.tsx` is the central circular button that opens the recording sheet
- `UserButton.tsx` and `UserProfilePopup.tsx` handle user profile display
- Bottom sheets (RecordingSheet, RecordingsSheet) handle recording UI

### Convex Backend
- Backend configuration in `convex/` directory
- Uses Convex for real-time database and backend functions
- Requires `EXPO_PUBLIC_CONVEX_URL` environment variable
- Auth integration configured in `convex/auth.config.ts`
- Currently minimal backend implementation (auth setup only)

### Styling
- Uses NativeWind (Tailwind for React Native)
- Custom color scheme defined in Tailwind config
- Theme colors:
  - `bg-protected-bg` / `bg-unprotected-bg` for screen backgrounds
  - `text-title-light` / `text-title-dark` for titles
  - `button-primary-bg` for primary buttons
  - Custom dark mode sheet backgrounds (#14171F)
- Uses Open Sans font family with multiple weights (300, 400, 600, 700, 800)

## Platform-Specific Notes

### iOS
- Requires microphone permission: `NSMicrophoneUsageDescription` is configured in app.json
- Bundle identifier: `com.anonymous.audioviz`

### Android
- Requires `RECORD_AUDIO` permission (configured in app.json)
- Package name: `com.anonymous.audioviz`
- Edge-to-edge mode enabled

## Environment Setup

The app requires these environment variables (typically in `.env.local`):
- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk authentication public key
- `EXPO_PUBLIC_CONVEX_URL` - Convex backend URL
- `CLERK_JWT_ISSUER_DOMAIN` - Clerk JWT issuer for Convex integration

## Important Technical Details

- New Architecture is enabled (`newArchEnabled: true` in app.json)
- React Compiler is enabled in experiments
- TypeScript is configured with strict mode and path aliases (`@/*` maps to root)
- The app uses React 19.1.0 and React Native 0.81.5
- Bottom sheets are rendered outside SafeAreaView to extend to screen edges
- Recording state persists through re-renders using refs and useCallback

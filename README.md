# Callback Clone

Expo (React Native) app — SDK 57, Expo Router, TypeScript. Rebuilt from the
owner's webview app into a true native app (tab navigation, app-style screens,
brand theme).

## App id (must change before store submission)

`app.json` currently uses the working placeholder **`com.callbackclone.app`**
for both `android.package` and `ios.bundleIdentifier`. This lets internal
preview builds run today, but the owner MUST replace both with their real,
unique app id (e.g. `com.<owner>.callback`) **before** submitting to the Play
Store / App Store — an app id cannot be changed after a build is published.

## Installable Android build (EAS cloud builds)

This project builds on Expo's cloud (EAS Build) — no local Android Studio/Gradle
needed. `eas.json` defines the `preview` profile: Android **APK**, internal
distribution, no dev client.

Prereq: an Expo access token. Create one at https://expo.dev/settings/access-tokens
and export it as **`EXPO_TOKEN`** (this is the exact env var eas-cli reads for
non-interactive auth — verified in the eas-cli source, version 22.0.0).

```bash
export EXPO_TOKEN=<token>     # one-time setup, creates/links the EAS project
./scripts/eas-build.sh        # or: bunx eas-cli init --non-interactive && bunx eas-cli build -p android --profile preview --non-interactive
```

The script prints the build URL; the APK download link appears in the build
output and on the EAS dashboard. Install the APK on a phone for a true
installable preview.

## Web preview (Vercel)

The app also exports as a static web site (`dist/`). Deploy it to Vercel for a
live click-through preview:

```bash
export VERCEL_TOKEN=<token>   # create at https://vercel.com/account/tokens
./deploy-vercel.sh            # exports dist/ and deploys (prints the live URL)
```

To build the export without deploying: `bun run export:web`.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

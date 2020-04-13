# Komoju Nexus Example

**This is still a work in progress and is not fully functioning yet**

This repo serves as a demonstration of how to integrate with [Komoju's QR API](https://docs.komoju.com/en/qr/integration_guide/).

## Building the APK

To build the APK you will need to run the following command from the root of the repository:
```
scripts/build-apk.sh
```

You'll then find the APK at top level of the repository, as `app-release.apk`

## Development

Follow the instructions in the [React-Native docs](https://reactnative.dev/docs/environment-setup) on setting up your development environment. Once configured you can run `npm run ios` to start the app for iOS devices or `npm run android` to start the app for Android devices.
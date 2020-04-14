# Komoju Nexus Example

This repo serves as a demonstration of how to integrate with [Komoju's QR API](https://docs.komoju.com/en/qr/integration_guide/).

The repository is broken into two main parts, the [provider](./provider) which is a NodeJS app, and the [client](./client) which is a React Native app. Both these applications follow the conventions set out for them in the [Nexus terminology guide](https://docs.komoju.com/en/qr/overview/#terminology)

## Running the app

You can find the [installable APK here](./app-release.apk) in the github repository. (Click view raw to download the file)

If you have an Android device, you can load the APK onto it to try it, otherwise you can set up your computer to run it in a simulator.

### Using a simulator

Follow the instructions in the [React-Native docs](https://reactnative.dev/docs/environment-setup) on setting up your development environment. Once configured you can run the following command to run the app on a simulator. Please note that the QR code scanning is not functional in either simulator.

```bash
$ cd client
$ npm run ios # to start the app in an iOS simulator
$ npm run android # to start the app in an Android simulator
```

## Development

The following section contain info on how to develop and contribute to the example app.

### Building the APK

To ensure that the APK in the github repo reflects the latest changes, you will need to re-build the APK after changes have been made to the `client`. To build the APK you will need to run the following command from the root of the repository:
```
scripts/build-apk.sh
```

The APK will then be updated at top level of the repository, as `app-release.apk`

If needed the password for the keystore is `komoju-demo`


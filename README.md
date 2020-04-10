# Komoju Nexus Example

**This is still a work in progress and is not fully functioning yet**

This repo serves as a demonstration of how to integrate with [Komoju's QR API](https://docs.komoju.com/en/qr/integration_guide/).

## Development

Follow the instructions in the [React-Native docs](https://reactnative.dev/docs/environment-setup) on setting up your development environment. Once configured you can run `npm run ios` to start the app for iOS devices or `npm run android` to start the app for Android devices.

## Deployment

The provider app is being deployed to https://nexus-example-provider.herokuapp.com/. To deploy a new version of the code run the following:

**Note: you only need to perform this step the first time**
```
$ heroku login
$ heroku git:remote -a nexus-example-provider
```

And to push a new version of the code run this from the git repository root:
```
$ git subtree push --prefix provider heroku master
```
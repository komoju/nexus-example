# Provider

This NodeJS app is an example of a [provider](https://docs.komoju.com/en/qr/overview/#terminology) needed to integrate with the Nexus QR system. The [`app.js`](./app.js) file is the entrypoint and lists all the endpoints this app accepts connections from.

## Development 

This section is for Developers at Degica that need to update the example app.

### Deployment

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
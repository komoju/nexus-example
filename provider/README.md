# Provider

This NodeJS app is an example of a [provider](https://docs.komoju.com/en/qr/overview/#terminology) needed to integrate with the Nexus QR system. The [`app.js`](./app.js) file is the entrypoint and lists all the endpoints this app accepts connections from.

## Development 

This section is for Developers at Degica that need to update the example app.

### Running it locally

to run it locally you will need to ensure all the dependencies are installed, by running `npm install`. Once that's completed you will be able to start the server using `npm run start:dev`. **Note:** Unless you change the details in the Komoju account Nexus will continue to send requests to the https://nexus-example-provider.herokuapp.com/

### Deployment

The provider app is being deployed to https://nexus-example-provider.herokuapp.com/. To deploy a new version of the code run the following:

**Note: you only need to perform this step the first time**
```bash
$ heroku login
$ heroku git:remote -a nexus-example-provider
```

And to push a new version of the code run this from the git repository root:
```bash
$ scripts/deploy-provider.sh
```
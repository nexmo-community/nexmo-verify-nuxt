# Adding 2FA to a Nuxt app using Server Side Middleware (Express)

This repo contains the example code for [our tutorial](https://www.nexmo.com/blog/2018/09/11/add-2fa-to-nuxt-with-nexmo-verify-dr) on adding two-factor authentication to an app built using the [Nuxt JS](https://nuxtjs.org) framework, Nexmo's [Verify API](https://developer.nexmo.com/verify/overview) and server side middleware built with Express.

## Installing your own version

Follow these steps to get your own version of this up and running:

```bash
$ git clone https://github.com/nexmo-community/nexmo-verify-nuxt.git
$ cd nexmo-verify-nuxt && npm install
```

Once installed, you will also need to create a file in the root directory called `.env`, into which you should put your API credentials and an encryption key for the JSON Web Tokens.

```yaml
apiKey='YOUR NEXMO API KEY'
apiSecret='YOUR NEXMO API SECRET'
jwtSecret='ANY RANDOM STRING OF NUMBERS AND LETTERS'
```

With that in place you should be able to run the app with `npm run start`.

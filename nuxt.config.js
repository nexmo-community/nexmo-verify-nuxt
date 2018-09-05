module.exports = {
  head: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js',
        body: true
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css'
      }
    ]
  },
  loading: false,
  build: {
    vendor: ['axios']
  },
  serverMiddleware: ['~/node-scripts/verification_api'],
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
};

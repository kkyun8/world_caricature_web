import 'dotenv/config'

require('dotenv').config()
const {
  SQUARE_APPLICATION_ID,
  SQUARE_ACCESS_TOKEN,
  SQUARE_LOCATION_ID,
  CART_MAX_COUNT,
  CART_LOCAL_STORAGE_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_DEFAULT_REGION,
  AWS_BUCKET,
  AWS_URL,
  LINE_CHANNEL_ACCESS_TOKEN,
  LINE_CHANNEL_SECRET,
  POSTAL_CODE_API_URL,
  POSTAL_CODE_API_KEY,
  AUTH_DOMAIN,
  AUTH_CLIENT_ID,
} = process.env

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'world_caricature_web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'https://js.squareupsandbox.com/v2/paymentform',
      },
      {
        type: 'text/javascript',
        src: 'https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
      },
    ],
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/css/styles.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/common-mixin-plugin.js',
    '@/plugins/axios.js',
    '@/plugins/aws.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'nuxt-fontawesome',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
  ],
  /**
   * auth0
   */
  auth: {
    strategies: {
      auth0: {
        domain: process.env.AUTH_DOMAIN,
        client_id: process.env.AUTH_CLIENT_ID,
        logoutRedirectUri: '/order_create',
      },
    },
    redirect: {
      login: '/order_create',
      logout: '/order_create',
      home: '/order_create',
      callback: '/callback', // コールバックURL
    },
  },
  /*
   ** FontAwesome
   */
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
    ],
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: { baseURL: 'http://localhost:3333' },
  // TODO: url 変更
  proxy: {
    'http://localhost:3000/process-payment': {
      target: 'http://localhost:4000/',
    },
    'http://localhost:3000/face-api': {
      target: 'http://localhost:4000/',
    },
    'http://localhost:3000/dynamodb': {
      target: 'http://localhost:8000 ',
      pathRewrite: {
        '^/dynamodb': '/',
      },
    },
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  env: {
    SQUARE_APPLICATION_ID,
    SQUARE_ACCESS_TOKEN,
    SQUARE_LOCATION_ID,
    CART_MAX_COUNT,
    CART_LOCAL_STORAGE_KEY,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_DEFAULT_REGION,
    AWS_BUCKET,
    AWS_URL,
    LINE_CHANNEL_ACCESS_TOKEN,
    LINE_CHANNEL_SECRET,
    POSTAL_CODE_API_URL,
    POSTAL_CODE_API_KEY,
    AUTH_DOMAIN,
    AUTH_CLIENT_ID,
  },
}

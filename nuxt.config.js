require('dotenv').config()
const {
  SQUARE_APPLICATION_ID,
  SQUARE_ACCESS_TOKEN,
  SQUARE_LOCATION_ID,
  CART_MAX_COUNT,
  CART_LOCAL_STORAGE_KEY,
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
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/common-mixin-plugin.js', '@/plugins/axios.js'],

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
  ],

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
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  env: {
    SQUARE_APPLICATION_ID,
    SQUARE_ACCESS_TOKEN,
    SQUARE_LOCATION_ID,
    CART_MAX_COUNT,
    CART_LOCAL_STORAGE_KEY,
  },
}

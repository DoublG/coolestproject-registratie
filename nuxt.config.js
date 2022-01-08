export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // TODO: Check if this is still required
  env: {
    baseUrl: process.env.NUXT_ENV_BASE_URL
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.npm_package_name || 'Coolestproject',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'msapplication-TileColor', content: '#000000' },
      { name: 'theme-color', content: '#ffffff' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        types: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        types: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'mask-icon',
        color: '#5bbad5',
        href: '/safari-pinned-tab.svg'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bus.js',
    '~/plugins/vee-validate.js',
    '~/plugins/services.js',
    '~/plugins/i18n-switcher.js',
    '~/plugins/attachments.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://i18n.nuxtjs.org/
    '@nuxtjs/i18n',
    'nuxt-vuex-localstorage'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true
  },

  i18n: {
    defaultLocale: 'nl',
    langDir: 'lang/',
    locales: [
      {
        code: 'en',
        file: 'en-US.js'
      },
      {
        code: 'nl',
        file: 'nl-BE.js'
      },
      {
        code: 'fr',
        file: 'fr-FR.js'
      }
    ],
    lazy: true,
    vueI18n: {
      fallbackLocale: 'nl',
      dateTimeFormats: {
        nl: {
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
            /*
            hour: 'numeric',
            minute: 'numeric' */
          }
        },
        fr: {
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
            /*
            hour: 'numeric',
            minute: 'numeric' */
          }
        },
        en: {
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
            /*
            hour: 'numeric',
            minute: 'numeric' */
          }
        }
      }
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'language',
      cookieDomain: process.env.NUXT_ENV_DOMAIN,
      onlyOnRoot: true
    }
  },

  fontawesome: {
    icons: {
      solid: ['faPlus', 'faEdit', 'faMinus',
        'faEject', 'faUnlock', 'faProjectDiagram', 'faUser', 'faLock', 'faGlobeEurope', 'faCheck',
        'faEnvelope', 'faCopy', 'faUserCircle', 'faPaperPlane', 'faTshirt', 'faTrashAlt', 'faUserEdit',
        'faTrashRestore', 'faUserMinus', 'faDownload', 'faUpload']
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.NUXT_ENV_BASE_URL
    }
  }

}

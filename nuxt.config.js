module.exports = {
  ssr: false,
  /*
  ** Headers of the page
  */
  env: {
    baseUrl: process.env.NUXT_ENV_BASE_URL
  },
  dotenv: {
  },
  head: {
    title: process.env.npm_package_name || '',
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
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  router: {},
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/bus.js',
    '~/plugins/vee-validate.js',
    '~/plugins/services.js',
    '~/plugins/i18n-switcher.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-i18n',
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['faPlus', 'faEdit', 'faMinus',
              'faEject', 'faUnlock', 'faProjectDiagram', 'faUser', 'faLock', 'faGlobeEurope', 'faCheck',
              'faEnvelope', 'faCopy', 'faUserCircle', 'faPaperPlane', 'faTshirt', 'faTrashAlt', 'faUserEdit',
              'faTrashRestore', 'faUserMinus']
          }
        ]
      }
    ],
    'nuxt-vuex-localstorage'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    componentPlugins: [
      'LayoutPlugin',
      'NavbarPlugin',
      'ButtonPlugin',
      'FormPlugin',
      'FormSelectPlugin',
      'FormTextareaPlugin',
      'FormCheckboxPlugin',
      'FormInputPlugin',
      'FormRadioPlugin',
      'FormGroupPlugin',
      'AlertPlugin',
      'ModalPlugin',
      'JumbotronPlugin',
      'SpinnerPlugin',
      'TablePlugin',
      'PopoverPlugin',
      'ImagePlugin',
      'CardPlugin',
      'ProgressPlugin',
      'FormFilePlugin'
    ]
  },
  components: true,
  generate: {},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) { },
    transpile: [
      'vee-validate/dist/rules',
      'nuxt-vuex-localstorage'
    ]
  },
  i18n: {
    defaultLocale: 'nl',
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'nl'
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'language',
      cookieDomain: process.env.NUXT_ENV_DOMAIN,
      onlyOnRoot: true
    },
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
    lazy: true
  },
  axios: {
    credentials: true
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.NUXT_ENV_BASE_URL
    }
  }
}

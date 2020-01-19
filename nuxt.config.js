module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/api',
    useProxy: process.env.USE_PROXY
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
        href: 'apple-touch-icon.png'
      },
      {
        rel: 'icon',
        types: 'image/png',
        sizes: '32x32',
        href: 'favicon-32x32.png'
      },
      {
        rel: 'icon',
        types: 'image/png',
        sizes: '16x16',
        href: 'favicon-16x16.png'
      },
      {
        rel: 'mask-icon',
        color: '#5bbad5',
        href: 'safari-pinned-tab.svg'
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
  router: {
    middleware: ['settings']
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vee-validate.js',
    '~/plugins/services.js'
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
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      vueI18nLoader: true
    }],
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
      'TablePlugin'
    ]
  },
  generate: {},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    transpile: [
      'vee-validate/dist/rules',
      'nuxt-vuex-localstorage'
    ]
  },
  i18n: {
    locales: ['en', 'fr', 'nl'],
    defaultLocale: 'nl',
    vueI18n: {
      fallbackLocale: 'nl'
    }
  },
  axios: {
    baseURL: 'https://coolestjury.azurewebsites.net',  // process.env.baseUrl,  
    // proxy: true,
    prefix: '/api'
  },
  proxy: {
    '/api/': { target: 'http://localhost:8080', pathRewrite: { '^/api/': '' } }
  }
}

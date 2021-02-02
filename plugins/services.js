import { localize } from 'vee-validate'
/* remove null values for api calls */
function cleanup (root) {
  const result = {}
  Object.keys(root).forEach(function (key, index) {
    const v = root[key]
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      result[key] = cleanup(v)
    } else if (v !== null) {
      result[key] = v
    }
  })
  return result
}

export default ({ app, store, redirect }, inject) => {
  app.$axios.interceptors.request.use((request) => {
    app.$bus.$emit('start')
    return request
  }, async (error) => { return await error })
  app.$axios.interceptors.response.use((response) => {
    app.$bus.$emit('finish')
    return response
  }, (error) => {
    // clean the store & redirect
    if (error.response.status === 401) {
      store.dispatch('auth/update', {})
      redirect(app.localePath('login'))
    }
    // we don't want to fail via error screen, trigger alert message on current screen
    app.$bus.$emit('display-msg', app.i18n.t('message_backendKaput'), 'danger')
    app.$bus.$emit('finish')
    // eslint-disable-next-line no-console
    console.log(error)
    return null
  })
  const serviceHandler = {
    projectinfo: {
      post (project) {
        return app.$axios.$post('/projectinfo', cleanup(project), { withCredentials: true })
      },
      post_token (token) {
        return app.$axios.$post('/projectinfo', {})
      },
      patch (project) {
        app.$bus.$emit('display-msg', app.i18n.t('message_successChange'), 'success')
        return app.$axios.$patch('/projectinfo', cleanup(project))
      },
      get () {
        return app.$axios.$get('/projectinfo')
      },
      delete () {
        return app.$axios.$delete('/projectinfo')
      }
    },
    participant: {
      post () {
        return app.$axios.$post('/participants', null)
      }
    },
    settings: {
      get () {
        return app.$axios.$get('/settings')
      }
    },
    questions: {
      get () {
        return app.$axios.$get('/questions', {
          headers: {
            'Accept-Language': app.i18n.locale
          }
        })
      }
    },
    approvals: {
      get () {
        return app.$axios.$get('/approvals', {
          headers: {
            'Accept-Language': app.i18n.locale
          }
        })
      }
    },
    tshirts: {
      get () {
        return app.$axios.$get('/tshirts', {
          headers: {
            'Accept-Language': app.i18n.locale
          }
        })
      }
    },
    registration: {
      post (registration) {
        app.$bus.$emit('display-msg', app.i18n.t('message_successReg'), 'success')
        return app.$axios.$post('/register', cleanup(registration))
      }
    },
    userinfo: {
      patch (user) {
        app.$bus.$emit('clear-msg')
        const response = app.$axios.$patch('/userinfo', cleanup(user))
        app.$bus.$emit('display-msg', app.i18n.t('message_successChange'), 'success')
        return response
      },
      async get () {
        const user = await app.$axios.$get('/userinfo')
        return user
      },
      delete () {
        app.$bus.$emit('clear-msg')
        const response = app.$axios.$delete('/userinfo')
        app.$bus.$emit('display-msg', app.i18n.t('message_successChange'), 'success')
        return response
      }
    },
    login: {
      post (token) {
        // this call sets the cookie used in de subsequent calls
        return app.$axios.$post('/login', null, { headers: { Authorization: 'Bearer ' + token } })
      }
    },
    logout: {
      post () {
        return app.$axios.$post('/logout', null)
      }
    },
    mail: {
      post (email) {
        return app.$axios.$post('/mailToken', email)
      }
    },
    attachment: {
      put (fileContent) {
        return app.$axios.$put('/mailToken', fileContent)
      }
    }
  }
  inject('services', serviceHandler)
}

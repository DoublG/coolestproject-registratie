
/* remove null values for api calls */
function cleanup(root) {
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

export default ({ app, store }, inject) => {
  const serviceHandler = {
    projectinfo: {
      post(project) {
        return app.$axios.$post('/projectinfo', cleanup(project), { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      },
      post_token(token) {
        return app.$axios.$post('/projectinfo', {}, { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      },
      patch(project) {
        return app.$axios.$patch('/projectinfo', cleanup(project), { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      },
      get() {
        return app.$axios.$get('/projectinfo', { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      },
      delete() {
        return app.$axios.$delete('/projectinfo', { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      }
    },
    participant: {
      post() {
        return app.$axios.$post('/participants', null, { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      }
    },
    settings: {
      get() {
        return app.$axios.$get('/settings')
      }
    },
    questions: {
      get() {
        return app.$axios.$get('/questions', {
          headers: {
            'Accept-Language': app.i18n.locale
          }
        })
      }
    },
    approvals: {
      get() {
        return app.$axios.$get('/approvals', {
          headers: {
            'Accept-Language': app.i18n.locale
          }
        })
      }
    },
    tshirts: {
      get() {
        return app.$axios.$get('/tshirts', {
          headers: {
            'Accept-Language': app.i18n.locale
          }
        })
      }
    },
    registration: {
      post(registration) {
        return app.$axios.$post('/register', cleanup(registration))
      }
    },
    userinfo: {
      patch(user) {
        return app.$axios.$patch('/userinfo', cleanup(user), { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      },
      async get() {
        const user = await app.$axios.$get('/userinfo', { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
        return user
      },
      delete() {
        return app.$axios.$delete('/userinfo', { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      }
    },
    login: {
      post(token) {
        return app.$axios.$post('/login', null, { headers: { Authorization: 'Bearer ' + token } })
      }
    },
    mail: {
      post(email) {
        return app.$axios.$post('/mailToken', { email })
      }
    }
  }
  inject('services', serviceHandler)
}

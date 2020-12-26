export default ({ app, store }, inject) => {
  const serviceHandler = {
    projectinfo: {
      post() {
        return app.$axios.$post('/projectinfo', store.getters['project/projectinfo'], { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      },
      post_token() {
        return app.$axios.$post('/projectinfo', store.getters['project/tokeninfo'], { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      },
      patch() {
        return app.$axios.$patch('/projectinfo', store.getters['project/projectinfo'], { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
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
        return app.$axios.$get('/questions')
      }
    },
    approvals: {
      get() {
        return app.$axios.$get('/approvals')
      }
    },
    tshirts: {
      get() {
        return app.$axios.$get('/tshirts')
      }
    },
    registration: {
      post() {
        return app.$axios.$post('/register', store.getters['registration/sanitizedJSON'])
      }
    },
    userinfo: {
      patch() {
        return app.$axios.$patch('/userinfo', store.getters['user/userinfo'], { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      },
      get() {
        return app.$axios.$get('/userinfo', { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
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

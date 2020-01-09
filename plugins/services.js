export default ({ app, store }, inject) => {
  const serviceHandler = {
    'projectinfo': {
      post () {
        return app.$axios.$post('/projectinfo', store.getters['project/projectinfo'], { headers: { api_key: store.state.auth.api_key } })
      },
      post_token () {
        return app.$axios.$post('/projectinfo', store.getters['project/tokeninfo'], { headers: { api_key: store.state.auth.api_key } })
      },
      patch () {
        return app.$axios.$patch('/projectinfo', store.getters['project/projectinfo'], { headers: { api_key: store.state.auth.api_key } })
      },
      get () {
        return app.$axios.get('/projectinfo', { headers: { api_key: store.state.auth.api_key } })
      },
      delete () {
        return app.$axios.$delete('/projectinfo', { headers: { api_key: store.state.auth.api_key } })
      }
    },
    'participant': {
      post () {
        return app.$axios.$post('/participants', null, { headers: { api_key: store.state.auth.api_key } })
      }
    },
    'settings': {
      get () {
        return app.$axios.get('/settings')
      }
    },
    'registration': {
      post () {
        return app.$axios.$post('/register', store.getters['registration/sanitizedJSON'])
      }
    },
    'userinfo': {
      patch () {
        return app.$axios.$patch('/userinfo', store.getters['user/userinfo'], { headers: { api_key: store.state.auth.api_key } })
      },
      get () {
        return app.$axios.$get('/userinfo', { headers: { api_key: store.state.auth.api_key } })
      },
      delete () {
        return app.$axios.$delete('/userinfo', { headers: { api_key: store.state.auth.api_key } })
      }
    },
    'login': {
      post (query) {
        return app.$axios.post('/login', { jwt: query.token })
      }
    }
  }
  inject('services', serviceHandler)
}

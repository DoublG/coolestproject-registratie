export default ({ app, store }, inject) => {
  const serviceHandler = {
    projectinfo: {
      post(project) {
        const createCreate = {
          project_name: project.project_name,
          project_descr: project.project_descr,
          project_type: project.project_type,
          project_lang: project.project_lang,
          info: project.info
        }
        return app.$axios.$post('/projectinfo', createCreate, { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      },
      post_token(token) {
        return app.$axios.$post('/projectinfo', {}, { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
      },
      patch(project) {
        const projectsUpdate = {
          project_name: project.project_name,
          project_descr: project.project_descr,
          project_type: project.project_type,
          project_lang: project.project_lang,
          info: project.info
        }
        return app.$axios.$patch('/projectinfo', projectsUpdate, { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
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
        return app.$axios.$post('/register', registration)
      }
    },
    userinfo: {
      patch(user) {
        return app.$axios.$patch('/userinfo', user, { headers: { Authorization: 'Bearer ' + store.state.auth.api_key } })
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

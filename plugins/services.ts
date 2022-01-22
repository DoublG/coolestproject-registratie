/* remove null values for api calls */
import { Plugin } from '@nuxt/types'

function cleanup (root: any) {
  const result = {} as { [key: string]: any }
  Object.keys(root).forEach(function (key, _) {
    const v = root[key]
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      result[key] = cleanup(v)
    } else if (v !== null) {
      result[key] = v
    }
  })
  return result
}

type AttachmentHandler = {
  post(name: any, filename: any, size: any): any,
  post_sas(name: any): any
}

type ProjectHandler = {
  get(): any
}

type RegistrationHandler = {
  post(registration: any): any
}

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $services: {
      registration: RegistrationHandler
    }
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $services: {
      attachments: AttachmentHandler,
      projectinfo: ProjectHandler,
      registration: RegistrationHandler
    }
  }
}

const services: Plugin = ({ app, store, redirect }, inject) => {
  app.$axios.interceptors.request.use((request: any) => {
    app.$bus.$emit('start')
    return request
  }, async (error: any) => { return await error })
  app.$axios.interceptors.response.use((response: any) => {
    app.$bus.$emit('finish')
    return response
  }, (error: any) => {
    // clean the store & redirect
    if (error.response.status === 401) {
      store.dispatch('auth/update', {})
      redirect(app.localePath('login'))
    }
    if (error.response.status === 404) {
      return null
    }
    // we don't want to fail via error screen, trigger alert message on current screen
    let message = app.i18n.t('message_backendKaput')
    if (error.response.data.code !== '000') {
      message = error.response.data.message
    }

    app.$bus.$emit('display-msg', message, 'danger')
    app.$bus.$emit('finish')
    // eslint-disable-next-line no-console
    console.log(error)
    return null
  })
  const serviceHandler = {
    projectinfo: {
      post (project: any) {
        return app.$axios.$post('/projectinfo', cleanup(project), { withCredentials: true })
      },
      post_token () {
        return app.$axios.$post('/projectinfo', {})
      },
      patch (project: any) {
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
    registration: {
      post (registration: any) {
        app.$bus.$emit('display-msg', app.i18n.t('message_successReg'), 'success')
        return app.$axios.$post('/register', cleanup(registration))
      }
    },
    userinfo: {
      patch (user: any) {
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
      post (token: any) {
        // this call sets the cookie used in de subsequent calls
        return app.$axios.$post('/login', {}, { headers: { Authorization: 'Bearer ' + token } })
      }
    },
    logout: {
      post () {
        return app.$axios.$post('/logout', {})
      }
    },
    mail: {
      post (email: any) {
        return app.$axios.$post('/mailToken', email)
      }
    },
    attachments: {
      post (name: any, filename: any, size: any) {
        return app.$axios.$post('/attachments', { name, filename, size })
      },
      post_sas (name: any) {
        return app.$axios.$post(`/attachments/${name}/sas`)
      },
      delete (name: any) {
        return app.$axios.$delete(`/attachments/${name}`)
      }
    }
  }
  inject('services', serviceHandler)
}

export default services

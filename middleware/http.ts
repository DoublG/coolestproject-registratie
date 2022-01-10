import { Middleware } from '@nuxt/types'
import { Configuration, SettingsApi } from '~/api'

declare module '@nuxt/types' {
  interface Context {
    $http: { settings: SettingsApi }
  }
}

const http: Middleware = (context) => {
  const configuration = new Configuration({ basePath: context.env.baseUrl })
  const settingsApi = new SettingsApi(configuration)
  context.$http = { settings: settingsApi }
}

export default http

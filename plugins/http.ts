import { Plugin } from '@nuxt/types'
import { Configuration, SettingsApi, ValuehelpsApi } from '~/api'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $http: { settings: SettingsApi, values: ValuehelpsApi }
  }
}

const http: Plugin = (context, inject) => {
  const configuration = new Configuration({ basePath: context.env.baseUrl })
  const settingsApi = new SettingsApi(configuration)
  const valuehelpsApi = new ValuehelpsApi(configuration)
  inject('http', { settings: settingsApi, values: valuehelpsApi })
}

export default http

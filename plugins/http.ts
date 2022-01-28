import { Plugin } from '@nuxt/types'
import { Approval, Configuration, Question, Settings, SettingsApi, TshirtGroup, ValuesApi } from '~/api'

type HttpSettings = {
  fetch(): Promise<Settings>
}

type HttpValues = {
  tshirts(): Promise<Array<TshirtGroup>>
  questions(): Promise<Array<Question>>
  approvals(): Promise<Array<Approval>>
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $http: { settings: HttpSettings, values: HttpValues }
  }
}

const errorSettings: Settings = {
  isActive: false
}

const http: Plugin = (context, inject) => {
  const configuration = new Configuration({ basePath: context.env.baseUrl })
  const settingsApi = new SettingsApi(configuration)
  const valuesApi = new ValuesApi(configuration)
  const language = () => context.app.i18n.locale
  inject('http', {
    settings: { fetch: () => settingsApi.fetch().then(response => response.data, _ => errorSettings) },
    values: {
      tshirts: () => valuesApi.fetchTshirts({ headers: { 'Accept-Language': language() } }).then(response => response.data),
      questions: () => valuesApi.fetchQuestions({ headers: { 'Accept-Language': language() } }).then(response => response.data),
      approvals: () => valuesApi.fetchApprovals({ headers: { 'Accept-Language': language() } }).then(response => response.data)
    }
  })
}

export default http

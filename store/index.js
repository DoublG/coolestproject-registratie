import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['registration', 'auth']
})
export const plugins = [vuexLocal.plugin]

export const state = () => ({
  startDateEvent: new Date(2020, 5, 16),
  maxAge: 18,
  minAge: 5,
  guardianAge: 16
})

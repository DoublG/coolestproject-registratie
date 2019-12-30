import VuexPersistence from 'vuex-persist'

import addYears from 'date-fns/add_years'
import addDays from 'date-fns/add_days'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['registration', 'auth']
})
export const plugins = [vuexLocal.plugin]

export const state = () => ({
  startDateEvent: new Date(2020, 5, 16),
  maxAge: 18,
  minAge: 5,
  guardianAge: 16,
  tshirtDate: new Date(2020, 5, 1),
  settingsLoaded: false
})

export const mutations = {
  startDateEvent (state, startDateEvent) {
    state.startDateEvent = startDateEvent
  },
  maxAge (state, maxAge) {
    state.maxAge = maxAge
  },
  minAge (state, minAge) {
    state.minAge = minAge
  },
  guardianAge (state, guardianAge) {
    state.guardianAge = guardianAge
  },
  tshirtDate (state, tshirtDate) {
    state.tshirtDate = tshirtDate
  },
  settingsLoaded (state, settingsLoaded) {
    state.settingsLoaded = settingsLoaded
  }
}

export const actions = {
  updateSettings ({ commit }, settings) {
    commit('startDateEvent', settings.startDateEvent)
    commit('maxAge', settings.maxAge)
    commit('minAge', settings.minAge)
    commit('guardianAge', settings.guardianAge)
    commit('tshirtDate', settings.tshirtDate)
    commit('settingsLoaded', true)
  }
}

export const getters = ({
  maxAgeDate: (state) => {
    return addDays(addYears(state.startDateEvent, -1 * state.minAge), -1)
  },
  minAgeDate: (state) => {
    return addDays(addYears(state.startDateEvent, -1 * state.maxAge), 1)
  }
})

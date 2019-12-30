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
  tshirtDate: new Date(2020, 5, 1)
})

export const getters = ({
  maxAgeDate: (state) => {
    return addDays(addYears(state.startDateEvent, -1 * state.minAge), -1)
  },
  minAgeDate: (state) => {
    return addDays(addYears(state.startDateEvent, -1 * state.maxAge), 1)
  }
})

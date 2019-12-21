export const state = {
  lastname: '',
  firstname: '',
  email: '',
  postalcode: '',
  language: '',
  birthmonth: '',
  gsm: ''
}
export const mutations = {
  language (state, language) {
    state.language = language
  },
  lastname (state, lastname) {
    state.lastname = lastname
  },
  firstname (state, firstname) {
    state.firstname = firstname
  },
  email (state, email) {
    state.email = email
  },
  postalcode (state, postalcode) {
    state.postalcode = postalcode
  },
  birthmonth (state, birthmonth) {
    state.birthmonth = birthmonth
  },
  gsm (state, gsm) {
    state.gsm = gsm
  }
}
export const actions = {
  lastname ({ commit }, lastname) {
    commit('lastname', lastname)
  },
  firstname ({ commit }, firstname) {
    commit('firstname', firstname)
  },
  updateUser ({ commit }, user) {
    commit('firstname', user.firstname)
    commit('lastname', user.lastname)
    commit('email', user.email)
    commit('postalcode', user.postalcode)
    commit('language', user.language)
    commit('gsm', user.gsm)
    commit('birthmonth', user.birthmonth)
  }
}

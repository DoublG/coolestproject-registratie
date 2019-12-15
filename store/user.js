export const state = {
  lastname: '',
  firstname: ''
}
export const mutations = {
  lastname (state, lastname) {
    state.lastname = lastname
  },
  firstname (state, firstname) {
    state.firstname = firstname
  }
}
export const actions = {
  lastname ({ commit }, lastname) {
    commit('lastname', lastname)
  },
  firstname ({ commit }, firstname) {
    commit('firstname', firstname)
  }
}

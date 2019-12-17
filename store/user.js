export const state = {
  lastname: '',
  firstname: '',
  email: ''
}
export const mutations = {
  lastname (state, lastname) {
    state.lastname = lastname
  },
  firstname (state, firstname) {
    state.firstname = firstname
  },
  email (state, email) {
    state.email = email
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
  }
}

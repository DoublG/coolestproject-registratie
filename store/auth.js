export const state = () => ({
  expires: null
})

export const mutations = {
  update(state, auth) {
    state.expires = auth.expires
  }
}

export const actions = {
  update({ commit }, auth) {
    commit('update', auth)
  },
  logout({ commit }) {
    commit('update', { expires: null })
  }
}

export const getters = {
  isLoggedIn: (state) => {
    return new Date(state.expires) > new Date()
  }
}

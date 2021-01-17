export const state = () => ({
  api_key: null,
  expires: null
})

export const mutations = {
  update(state, auth) {
    state.api_key = auth.key
    state.expires = auth.expires
  }
}

export const actions = {
  update({ commit }, auth) {
    commit('update', auth)
  },
  logout({ commit }) {
    commit('update', { key: null, expires: null })
  }
}

export const getters = {
  isLoggedIn: (state) => {
    return new Date(state.expires) > new Date()
  }
}

export const state = {
  api_key: '',
  expires: ''
}

export const mutations = {
  api_key (state, apiKey) {
    state.api_key = apiKey
  },
  expires (state, expires) {
    state.expires = expires
  }
}

export const actions = {
  api_key ({ commit }, apiKey) {
    commit('api_key', apiKey)
  },
  expires ({ commit }, expires) {
    commit('expires', expires)
  },
  logout ({ commit }) {
    commit('expires', null)
    commit('api_key', null)
  }
}

export const getters = {
  isLoggedIn: (state) => {
    return new Date(state.expires) > new Date()
  }
}

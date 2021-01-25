import Vue from 'vue'

export const state = () => ({
  own_project: {},
  user: {
    mandatory_approvals: []
  },
  other_project: {}
})

export const mutations = {
  own_project(state, ownProject) {
    state.own_project = ownProject
  },
  other_project(state, otherProject) {
    state.other_project = otherProject
  },
  user(state, user) {
    state.user = user
  }
}

export const actions = {
  own_project({ commit }, ownProject) {
    commit('own_project', ownProject)
  },
  other_project({ commit }, otherProject) {
    commit('other_project', otherProject)
  },
  user({ commit }, user) {
    commit('user', user)
  }
}

export const getters = {}

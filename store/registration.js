import Vue from 'vue'

<<<<<<< HEAD
const originalState = () => {
  return {
    // own project
    project_name: null,
    project_descr: null,
    project_type: null,
    project_lang: null,
    // other project
    project_code: null,
    // user
    user_language: 'nl',
    user_year: null,
    user_month: null,
    user_email: null,
    user_firstname: null,
    user_lastname: null,
    user_sex: null,
    user_gsm: null,
    user_via: null,
    user_medical: null,
    user_email_guardian: null,
    user_gsm_guardian: null,
    user_t_size: null,
    user_general_questions: [],
    user_mandatory_approvals: [],
    // user address
    user_address_postalcode: null,
    user_address_street: null,
    user_address_house_number: null,
    user_address_bus_number: null,
    user_address_municipality_name: null
  }
}

export const state =  originalState()
=======
export const state = () => ({
  own_project: {},
  user: {
    mandatory_approvals: []
  },
  other_project: {}
})
>>>>>>> 1b626f11d672226555e35463545bcaca06f80813

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

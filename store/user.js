export const state = {
  gsm: '',
  general_questions: '',
  email_guardian: '',
  gsm_guardian: '',
  medical: '',
  sex: '',
  t_size: '',
  lastname: '',
  via: '',
  birthmonth: '',
  postalcode: '',
  extra: '',
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
  },
  gsm (state, gsm) {
    state.gsm = gsm
  },
  general_questions (state, generalQuestions) {
    state.general_questions = generalQuestions
  },
  email_guardian (state, emailGuardian) {
    state.email_guardian = emailGuardian
  },
  gsm_guardian (state, gsmGuardian) {
    state.gsm_guardian = gsmGuardian
  },
  medical (state, medical) {
    state.medical = medical
  },
  sex (state, sex) {
    state.sex = sex
  },
  t_size (state, tSize) {
    state.t_size = tSize
  },
  via (state, via) {
    state.via = via
  },
  birthmonth (state, birthmonth) {
    state.birthmonth = birthmonth
  },
  postalcode (state, postalcode) {
    state.postalcode = postalcode
  },
  extra (state, extra) {
    state.extra = extra
  }
}
export const actions = {
  updateUser ({ commit }, user) {
    commit('firstname', user.firstname)
    commit('lastname', user.lastname)
    commit('email', user.email)
    commit('gsm', user.gsm)
    commit('general_questions', user.general_questions)
    commit('email_guardian', user.email_guardian)
    commit('gsm_guardian', user.gsm_guardian)
    commit('medical', user.medical)
    commit('sex', user.sex)
    commit('t_size', user.t_size)
    commit('via', user.via)
    commit('birthmonth', user.birthmonth)
    commit('postalcode', user.postalcode)
    commit('extra', user.extra)
  }
}

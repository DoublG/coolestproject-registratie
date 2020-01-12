export const state = () => ({
  gsm: null,
  general_questions: null,
  general_questions2: null,
  email_guardian: null,
  gsm_guardian: null,
  medical: null,
  sex: null,
  t_size: null,
  lastname: null,
  via: null,
  birthmonth: null,
  postalcode: null,
  firstname: null,
  email: null,
  language: null,
  delete_possible: null
})

export const mutations = {
  delete_possible (state, deletePossible) {
    state.delete_possible = deletePossible
  },
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
  gsm (state, gsm) {
    state.gsm = gsm
  },
  general_questions (state, generalQuestions) {
    state.general_questions = generalQuestions
  },
  general_questions2 (state, generalQuestions2) {
    state.general_questions2 = generalQuestions2
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
  }
}

export const actions = {
  updateUser ({ commit }, user) {
    if (user) {
      commit('firstname', user.firstname)
      commit('lastname', user.lastname)
      commit('email', user.email)
      commit('gsm', user.gsm)
      commit('general_questions', user.general_questions[0])
      commit('general_questions2', user.general_questions[1])
      commit('email_guardian', user.email_guardian)
      commit('gsm_guardian', user.gsm_guardian)
      commit('medical', user.medical)
      commit('sex', user.sex)
      commit('t_size', user.t_size)
      commit('via', user.via)
      commit('birthmonth', new Date(user.birthmonth))
      commit('postalcode', user.postalcode)
      commit('language', user.language)
      commit('delete_possible', user.delete_possible)
    } else {
      commit('firstname', null)
      commit('lastname', null)
      commit('email', null)
      commit('gsm', null)
      commit('general_questions', null)
      commit('general_questions2', null)
      commit('email_guardian', null)
      commit('gsm_guardian', null)
      commit('medical', null)
      commit('sex', null)
      commit('t_size', null)
      commit('via', null)
      commit('birthmonth', null)
      commit('postalcode', null)
      commit('language', null)
      commit('delete_possible', null)
    }
  }
}
export const getters = {
  userinfo: (state) => {
    const user = {
      firstname: state.firstname,
      lastname: state.lastname,
      gsm: state.gsm,
      general_questions: [
        state.general_questions,
        state.general_questions2
      ],
      medical: state.medical,
      sex: state.sex,
      t_size: state.t_size,
      via: state.via,
      birthmonth: state.birthmonth.toISOString().substr(0, 10),
      postalcode: state.postalcode,
      language: state.language
    }
    if (state.gsm_guardian !== null) {
      user.gsm_guardian = state.gsm_guardian
      user.email_guardian = state.email_guardian
    }
    return user
  }
}

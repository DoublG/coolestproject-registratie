import differenceInCalendarYears from 'date-fns/difference_in_calendar_years'

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
  email: '',
  language: ''
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
    commit('language', user.language)
  }
}
export const getters = {
  userinfo: (state) => {
    return {
      firstname: state.firstname,
      lastname: state.lastname
    }
  },
  sanitizedJSON: (state, getter, rootState) => {
    // We need to cleanup the JSON a bit
    // 1) We don't want to send null values
    // 2) the local store stores everything as a string so we need to fix that before sending
    // 3) we only want to send the date not the time
    const sanitizedJSON = {
      general_questions: [],
      language: 'en'
    }
    Object.keys(state).forEach(function (key) {
      if (state[key] !== null) {
        switch (key) {
          case 'birthmonth':
            const date = typeof state[key] === typeof Date ? state[key] : new Date(state[key])
            sanitizedJSON[key] = date.toISOString().substr(0, 10)
            break
          case 'postalcode':
            const postalcode = typeof state[key] === typeof Number ? state[key] : Number.parseInt(state[key])
            sanitizedJSON[key] = postalcode
            break
          case 'general_questions':
            sanitizedJSON.general_questions[0] = state[key]
            break
          case 'general_questions2':
            sanitizedJSON.general_questions[1] = state[key]
            break
          default:
            sanitizedJSON[key] = state[key]
            break
        }
      }
    })
    // we have 2 scenarios, the service doesn't allow any extra fields
    // 1) registration with project
    // 2) registration without project
    if (sanitizedJSON.project_code) {
      delete sanitizedJSON.project_name
      delete sanitizedJSON.project_descr
      delete sanitizedJSON.project_type
      delete sanitizedJSON.project_lang
    } else {
      delete sanitizedJSON.project_code
    }
    // no guardian information needed so don't send
    if (differenceInCalendarYears(rootState.startDateEvent, sanitizedJSON.birthmonth) > rootState.guardianAge) {
      delete sanitizedJSON.gsm_guardian
      delete sanitizedJSON.email_guardian
    }

    return sanitizedJSON
  }
}

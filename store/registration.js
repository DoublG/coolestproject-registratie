import { differenceInCalendarYears } from 'date-fns'

const originalState = () => {
  return {
    language: 'nl',
    postalcode: null,
    street: null,
    house_number: null,
    bus_number: null,
    municipality_name: null,
    email: null,
    firstname: null,
    lastname: null,
    sex: null,
    questions: [],
    mandatory_approvals: [],
    birthmonth: null,
    t_size: null,
    via: null,
    medical: null,
    project_name: null,
    project_descr: null,
    project_type: null,
    project_code: null,
    project_lang: 'nl',
    gsm: null,
    gsm_guardian: null,
    email_guardian: null
  }
}

export const state = originalState

export const mutations = {
  language(state, language) {
    state.language = language
  },
  email_guardian(state, emailGuardian) {
    state.email_guardian = emailGuardian
  },
  gsm(state, gsm) {
    state.gsm = gsm
  },
  gsm_guardian(state, gsmGuardian) {
    state.gsm_guardian = gsmGuardian
  },
  postalcode(state, postalcode) {
    state.postalcode = postalcode
  },
  street(state, street) {
    state.street = street
  },
  house_number(state, houseNumber) {
    state.house_number = houseNumber
  },
  bus_number(state, busNumber) {
    state.bus_number = busNumber
  },
  email(state, email) {
    state.email = email
  },
  firstname(state, firstname) {
    state.firstname = firstname
  },
  lastname(state, lastname) {
    state.lastname = lastname
  },
  sex(state, sex) {
    state.sex = sex
  },
  questions(state, general) {
    state.general = general
  },
  mandatory_approvals(state, mandatoryApprovals) {
    state.mandatory_approvals = mandatoryApprovals
  },
  birthmonth(state, birthmonth) {
    state.birthmonth = birthmonth
  },
  size(state, size) {
    state.size = size
  },
  type(state, type) {
    state.type = type
  },
  via(state, via) {
    state.via = via
  },
  medical(state, medical) {
    state.medical = medical
  },
  project_name(state, projectName) {
    state.project_name = projectName
  },
  project_descr(state, projectDescr) {
    state.project_descr = projectDescr
  },
  project_type(state, projectType) {
    state.project_type = projectType
  },
  project_code(state, projectCode) {
    state.project_code = projectCode
  },
  project_lang(state, projectLang) {
    state.project_lang = projectLang
  },
  t_size(state, tSize) {
    state.t_size = tSize
  },
  municipality_name(state, municipalityName) {
    state.municipality_name = municipalityName
  }
}

export const actions = {
  language({ commit }, language) {
    commit('language', language)
  },
  email_guardian({ commit }, emailGuardian) {
    commit('email_guardian', emailGuardian)
  },
  gsm({ commit }, gsm) {
    commit('gsm', gsm)
  },
  gsm_guardian({ commit }, gsmGuardian) {
    commit('gsm_guardian', gsmGuardian)
  },
  postalcode({ commit }, postalcode) {
    commit('postalcode', postalcode)
  },
  street({ commit }, street) {
    commit('street', street)
  },
  house_number({ commit }, houseNumber) {
    commit('house_number', houseNumber)
  },
  bus_number({ commit }, busNumber) {
    commit('bus_number', busNumber)
  },
  email({ commit }, email) {
    commit('email', email)
  },
  firstname({ commit }, firstname) {
    commit('firstname', firstname)
  },
  lastname({ commit }, lastname) {
    commit('lastname', lastname)
  },
  sex({ commit }, sex) {
    commit('sex', sex)
  },
  questions({ commit }, questions) {
    commit('questions', questions
    )
  },
  mandatory_approvals({ commit }, mandatoryApprovals) {
    commit('mandatory_approvals', mandatoryApprovals)
  },
  birthmonth({ commit }, birthmonth) {
    commit('birthmonth', birthmonth)
  },
  t_size({ commit }, tSize) {
    commit('t_size', tSize)
  },
  via({ commit }, via) {
    commit('via', via)
  },
  medical({ commit }, medical) {
    commit('medical', medical)
  },
  project_name({ commit }, projectName) {
    commit('project_name', projectName)
  },
  project_descr({ commit }, projectDescr) {
    commit('project_descr', projectDescr)
  },
  project_type({ commit }, projectType) {
    commit('project_type', projectType)
  },
  project_code({ commit }, projectCode) {
    commit('project_code', projectCode)
  },
  project_lang({ commit }, projectLang) {
    commit('project_lang', projectLang)
  },
  municipality_name({ commit }, municipalityName) {
    commit('municipality_name', municipalityName)
  },

  // clear registration form
  clear_form({ commit }) {
    const origState = originalState()
    Object.keys(origState).forEach(function (key) {
      commit(key, origState[key])
    })
  }
}

export const getters = {
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
          case 'birthmonth': {
            const date = typeof state[key] === typeof Date ? state[key] : new Date(state[key])
            sanitizedJSON[key] = date.toISOString().substr(0, 10)
            break
          }
          case 'postalcode': {
            const postalcode = typeof state[key] === typeof Number ? state[key] : Number.parseInt(state[key])
            sanitizedJSON[key] = postalcode
            break
          }/*
          case 'general_questions': {
            sanitizedJSON.general_questions = []
            // sanitizedJSON.general_questions[0] = sanitizedJSON.general_questions.filter(q => q !== '_')
            break
          }
          case 'general_questions2': {
            sanitizedJSON.general_questions[1] = state[key]
            break
          } */
          default: {
            sanitizedJSON[key] = state[key]
            break
          }
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

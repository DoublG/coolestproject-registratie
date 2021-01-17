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

export const state = originalState

export const mutations = {
  own_project(state, ownProject) {
    state.project_name = ownProject.project_name
    state.project_descr = ownProject.project_descr
    state.project_type = ownProject.project_type
    state.project_lang = ownProject.project_lang
  },
  other_project(state, otherProject) {
    state.project_code = otherProject.project_code
  },
  user(state, user) {
    state.user_language = user.language
    state.user_year = user.year
    state.user_month = user.month
    state.user_email = user.email
    state.user_firstname = user.firstname
    state.user_lastname = user.lastname
    state.user_sex = user.sex
    state.user_gsm = user.gsm
    state.user_via = user.via
    state.user_medical = user.medical
    state.user_email_guardian = user.email_guardian
    state.user_gsm_guardian = user.gsm_guardian
    state.user_t_size = user.t_size
    state.user_general_questions = user.general_questions
    state.user_mandatory_approvals = user.mandatory_approvals
    // user address
    state.user_address_postalcode = user.address.postalcode
    state.user_address_street = user.address.street
    state.user_address_house_number = user.address.house_number
    state.user_address_bus_number = user.address.bus_number
    state.user_address_municipality_name = user.address.municipality_name
  },
  reset(state) {
    const origState = originalState()
    Object.keys(origState).forEach(function (key) {
      state[key] = origState[key]
    })
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
  },
  reset({ commit }) {
    commit('reset')
  }
}

export const getters = {
  own_project: (state, getter, rootState) => {
    return {
      project_name: state.project_name,
      project_descr: state.project_descr,
      project_type: state.project_type,
      project_lang: state.project_lang
    }
  },
  other_project: (state, getter, rootState) => {
    return {
      project_code: state.project_code
    }
  },
  user: (state, getter, rootState) => {
    return {
      language: state.user_language,
      year: state.user_year,
      month: state.user_month,
      email: state.user_email,
      firstname: state.user_firstname,
      lastname: state.user_lastname,
      sex: state.user_sex,
      gsm: state.user_gsm,
      via: state.user_via,
      medical: state.user_medical,
      email_guardian: state.user_email_guardian,
      gsm_guardian: state.user_gsm_guardian,
      t_size: state.user_t_size,
      // copy before return
      general_questions: [...state.user_general_questions],
      mandatory_approvals: [...state.user_mandatory_approvals],
      address: {
        postalcode: state.user_address_postalcode,
        street: state.user_address_street,
        house_number: state.user_address_house_number,
        bus_number: state.user_address_bus_number,
        municipality_name: state.user_address_municipality_name
      }
    }
  },
  post_api: (state, getter, rootState) => {
    const base = {
      user: {
        email: state.user_email,
        firstname: state.user_firstname,
        lastname: state.user_lastname,
        sex: state.user_sex,
        language: state.user_language,
        general_questions: state.user_general_questions,
        mandatory_approvals: state.user_mandatory_approvals,
        year: parseInt(state.user_year),
        month: parseInt(state.user_month),
        sizeId: parseInt(state.user_t_size),
        via: state.user_via,
        medical: state.user_medical,
        gsm: state.user_gsm,
        gsm_guardian: state.user_gsm_guardian,
        email_guardian: state.user_email_guardian,
        address: {
          postalcode: parseInt(state.user_address_postalcode),
          street: state.user_address_street,
          house_number: state.user_address_house_number,
          bus_number: state.user_address_bus_number,
          municipality_name: state.user_address_municipality_name
        }
      },
      other_project: {
        project_code: state.project_code
      },
      own_project: {
        project_name: state.project_name,
        project_descr: state.project_descr,
        project_type: state.project_type,
        project_lang: state.project_lang
      }
    }
    // cleanup api call (remove nulls & cleanup questions)
    const cleanup = {}
    Object.keys(base).forEach(function (key) {
      // remove nulls
      if (!base[key]) {
        return
      }
      cleanup[key] = base[key]
    })
    return cleanup
  }
}

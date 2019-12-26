export const state = () => ({
  project_name: '',
  project_descr: '',
  project_type: '',
  project_lang: '',
  project_code: ''
})
export const getters = {
  projectinfo: (state) => {
    return {
      project_name: state.project_name,
      project_descr: state.project_descr,
      project_type: state.project_type,
      project_lang: state.project_lang,
      project_code: state.project_code
    }
  }
}
export const mutations = {
  project_name (state, projectName) {
    state.project_name = projectName
  },
  project_descr (state, projectDescr) {
    state.project_descr = projectDescr
  },
  project_type (state, projectType) {
    state.project_type = projectType
  },
  project_lang (state, projectLang) {
    state.project_lang = projectLang
  },
  project_code (state, projectCode) {
    state.project_code = projectCode
  }
}

export const actions = {
  updateProject ({ commit }, project) {
    commit('project_name', project.project_name)
    commit('project_descr', project.project_descr)
    commit('project_type', project.project_type)
    commit('project_lang', project.project_lang)
    commit('project_code', project.projectCode)
  }
}

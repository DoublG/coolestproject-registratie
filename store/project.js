export const state = () => ({
  project_id: null,
  project_name: null,
  project_descr: null,
  project_type: null,
  project_lang: null,
  participants: null,
  own_project: null,
  remaining_tokens: null,
  project_code: null,
  project_owner: null,
  delete_possible: null
})
export const getters = {
  projectinfo: (state) => {
    return {
      project_name: state.project_name,
      project_descr: state.project_descr,
      project_type: state.project_type,
      project_lang: state.project_lang
    }
  },
  tokeninfo: (state) => {
    return {
      project_code: state.project_code
    }
  }
}
export const mutations = {
  delete_possible (state, deletePossible) {
    state.delete_possible = deletePossible
  },
  remaining_tokens (state, remainingTokens) {
    state.remaining_tokens = remainingTokens
  },
  project_code (state, projectCode) {
    state.project_code = projectCode
  },
  own_project (state, ownProject) {
    state.own_project = ownProject
  },
  project_id (state, projectId) {
    state.project_id = projectId
  },
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
  participants (state, participants) {
    state.participants = participants
  },
  project_owner (state, projectOwner) {
    state.project_owner = projectOwner
  }
}

export const actions = {
  updateProject ({ commit }, project) {
    if (project !== null) {
      commit('project_id', project.project_id)
      commit('project_name', project.project_name)
      commit('project_descr', project.project_descr)
      commit('project_type', project.project_type)
      commit('project_lang', project.project_lang)
      commit('participants', project.participants)
      commit('own_project', project.own_project)
      commit('remaining_tokens', project.remaining_tokens)
      commit('project_owner', project.project_owner)
      commit('delete_possible', project.delete_possible)
      if (!project.project_code) {
        commit('project_code', null)
      }
    } else {
      commit('project_id', null)
      commit('project_name', null)
      commit('project_descr', null)
      commit('project_type', null)
      commit('project_lang', null)
      commit('participants', null)
      commit('own_project', null)
      commit('remaining_tokens', null)
      commit('project_owner', null)
      commit('project_code', null)
      commit('delete_possible', null)
    }
  }
}

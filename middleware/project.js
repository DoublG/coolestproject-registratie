import axios from 'axios'

export default async function ({ store, redirect }) {
  if (store.state.create_project) {
    return
  }
  // load projectData
  try {
    const projectData = await axios.get('/api/projectinfo', { headers: { api_key: store.state.auth.api_key } })
    if (projectData.data !== '') {
      await store.dispatch('project/updateProject', projectData.data)
    }
  } catch (error) {}

  // no project found
  if (store.state.project.project_id === null) {
    redirect('./no_project')
  }
}

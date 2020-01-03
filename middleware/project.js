import axios from 'axios'

export default async function ({ store, redirect }) {
  // load projectData
  try {
    const projectData = await axios.get('/api/projectinfo', { headers: { api_key: store.state.auth.api_key } })
    console.log(projectData)
    if (projectData.data !== null) {
      await store.dispatch('project/updateProject', projectData.data)
    }
  } catch (error) {}

  // no project found
  if (store.state.project.project_name === null || store.state.project.project_name === undefined) {
    redirect('./no_project')
  }
}

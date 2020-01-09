export default async function ({ app, store, redirect }) {
  // load projectData
  try {
    const projectData = await app.$axios.get('/projectinfo', { headers: { api_key: store.state.auth.api_key } })
    if (projectData.data !== null) {
      await store.dispatch('project/updateProject', projectData.data)
    }
  } catch (error) {}

  // no project found
  if (store.state.project.project_name === null || store.state.project.project_name === undefined) {
    redirect('./no_project')
  }
}

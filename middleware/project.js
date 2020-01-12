export default async function ({ app, store, redirect }) {
  // load projectData
  try {
    const projectData = await app.$services.projectinfo.get()
    if (projectData !== null) {
      await store.dispatch('project/updateProject', projectData)
    }
  } catch (error) {
    console.log(error)
  }

  // no project found
  if (store.state.project.project_name === null || store.state.project.project_name === undefined) {
    app.router.push({ path: 'no_project' })
  }
}

export default async function ({ app, store, redirect }) {
  try {
    if (!store.state.settingsLoaded) {
      const settings = await app.$services.settings.get()
      if (settings !== '') {
        await store.dispatch('updateSettings', settings)
      }
    }
  } catch (error) {
    app.router.push({ path: '/index' })
  }
}

export default async function ({ app, store, redirect }) {
  try {
    if (!store.state.settingsLoaded) {
      const settings = await app.$axios.get('/settings')
      if (settings.data !== '') {
        await store.dispatch('updateSettings', settings.data)
      }
    }
  } catch (error) {
    // using default settings
  }
}

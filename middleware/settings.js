import axios from 'axios'

export default async function ({ store, redirect }) {
  try {
    const settings = await axios.get('/api/settings')
    if (settings.data !== '') {
      await store.dispatch('updateSettings', settings.data)
    }
  } catch (error) {}
}

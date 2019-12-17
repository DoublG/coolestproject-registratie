export default function ({ store, redirect }) {
  if (new Date(store.state.auth.expires) < new Date()) {
    redirect('./login')
  }
}

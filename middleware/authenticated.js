export default function ({ app, store, redirect }) {
  if (new Date(store.state.auth.expires) < new Date()) {
    redirect(app.localePath('login'))
  }
}

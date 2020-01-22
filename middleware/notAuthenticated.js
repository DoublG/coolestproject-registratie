export default function ({ store, app, redirect }) {
  if (new Date(store.state.auth.expires) >= new Date()) {
    redirect('/user')
  }
}

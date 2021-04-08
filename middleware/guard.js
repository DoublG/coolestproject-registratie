let loaded = false
let dirty = false
export default function ({ app, $bus }) {
  $bus.$on('block-navigation', (d) => {
    dirty = d
  })
  function guard (to, from, next) {
    if (from.path === '/upload' && dirty) {
      if (confirm('upload still in progress are you sure ?')) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
  if (!loaded) {
    app.router.beforeEach(guard)
    loaded = true
  }
}

export default function ({ app }) {
  app.router.beforeEach((to, from, next) => {
    if (from.path === '/upload') {
      if (confirm('are you sure')) {
        next()
      }
    } else {
      next()
    }
  })
}

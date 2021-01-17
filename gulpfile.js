const gulp = require('gulp')
const run = require('gulp-run')

// used in our azure deployment pipeline
gulp.task('production', function () {
  return run('npm run generate', {
    verbosity: 3,
    env: {
      ...process.env,
      ...{
        NUXT_ENV_BASE_URL: 'https://coolestjury.azurewebsites.net/',
        NODE_ENV: 'production',
        NUXT_ENV_USE_PROXY: false
      }
    }
  }).exec()
})

const gulp = require('gulp')
const run = require('gulp-run')

// used in our azure deployment pipeline
gulp.task('production', function () {
  return run('npm run generate', {
    verbosity: 3,
    env: { ...process.env,
      ...{
        BASE_URL: 'https://coolestjury.azurewebsites.net/',
        NODE_ENV: 'production'
      } }
  }).exec()
})

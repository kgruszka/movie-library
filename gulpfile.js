'use strict'
const gulp = require('gulp')
const exec = require('child_process').exec
const seq = require('run-sequence')
const DEVELOPMENT_CONTAINER = 'movie-library-dev'

async function cmd (command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err && !options.omitErr) {
        console.log(stdout)
        reject(stderr)
      } else {
        console.log(stdout)
        resolve(stdout)
      }
    })
  })
}

gulp.task('dev:build', async () => cmd('docker-compose build'))

gulp.task('dev:up', async () => cmd('docker-compose up -d'))

gulp.task('dev:down', async () => cmd('docker-compose down -v'))

gulp.task('dev:app:restart', async () => cmd('docker-compose restart app'))

gulp.task('dev', cb => {
  seq(
    'dev:down',
    'dev:build',
    'dev:up',
    cb
  )
})

gulp.task('test', () => {
  return cmd(`docker exec -t ${DEVELOPMENT_CONTAINER} npm test`, {omitErr: true})
})

gulp.task('test:acceptance', () => {
  return cmd(`docker exec -t ${DEVELOPMENT_CONTAINER} npm run-script test:acceptance`, {omitErr: true})
})

gulp.task('standard:fix', () => {
  return cmd(`docker exec -t ${DEVELOPMENT_CONTAINER} standard --fix`, {omitErr: true})
})

process.on('uncaughtException', (err) => {
  console.log(`${err}`)
})

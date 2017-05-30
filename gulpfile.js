'use strict'
const gulp = require('gulp')
const exec = require('child_process').exec;
const seq = require('run-sequence');
const DEVELOPMENT_IMAGE = 'movie-library-dev'
const DEVELOPMENT_CONTAINER = 'movie-library-dev'
const DEPENDENCIES_IMAGE = 'movie-library-dep'
const DEPENDENCIES_CONTAINER = 'movie-library-dep'
const DEVELOPMENT_IMAGE_FILE = 'Dockerfile.dev'
const DEPENDENCIES_IMAGE_FILE = 'Dockerfile.dev.dep'

async function cmd (command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err && !options.omitErr) {
        console.log(stdout);
        reject(stderr)
      } else {
        console.log(stdout);
        resolve(stdout)
      }
    })
  })
}

gulp.task('dev:build', () => {
  const buildDependenciesImage = cmd(`docker build -t ${DEPENDENCIES_IMAGE} -f ${DEPENDENCIES_IMAGE_FILE} .`)
  const buildDevelopmentImage = cmd(`docker build -t ${DEVELOPMENT_IMAGE} -f ${DEVELOPMENT_IMAGE_FILE} .`)
  return Promise.all([buildDependenciesImage, buildDevelopmentImage])
})

gulp.task('dev:run', () => {
  return cmd(`docker run -d --rm -p 3000:3000 -v %cd%:/opt/project --volumes-from ${DEPENDENCIES_CONTAINER} --name ${DEVELOPMENT_CONTAINER} ${DEVELOPMENT_IMAGE}`)
})

gulp.task('dev:rm', async () => {
  const exists = await cmd(`docker ps -q -f name=${DEVELOPMENT_CONTAINER}`)
  if (exists) {
    return cmd(`docker rm -v -f ${DEVELOPMENT_CONTAINER}`)
  }
})

gulp.task('dev:dep:create', () => {
  return cmd(`docker create --name ${DEPENDENCIES_CONTAINER} ${DEPENDENCIES_IMAGE}`)
})

gulp.task('dev:dep:rm', async () => {
  const exists = await cmd(`docker ps -a -q -f name=${DEPENDENCIES_CONTAINER}`)
  if (exists) {
    return cmd(`docker rm -v -f ${DEPENDENCIES_CONTAINER}`)
  }
})

gulp.task('dev:clean', ['dev:rm', 'dev:dep:rm'])

gulp.task('dev', cb => {
  seq(
    ['dev:build', 'dev:clean'],
    'dev:dep:create',
    'dev:run',
    cb
  )
})

gulp.task('test', () => {
  return cmd(`docker exec ${DEVELOPMENT_CONTAINER} npm test`, {omitErr:true})
})

gulp.task('test:acceptance', () => {
  return cmd(`docker exec ${DEVELOPMENT_CONTAINER} npm run-script test:acceptance`, {omitErr:true})
})

process.on('uncaughtException', (err) => {
  console.log(`${err}`)
})

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
const DEVELOPMENT_NETWORK = 'movie-library-network'
const DEVELOPMENT_NETWORK_SUBNET = '172.25.10.0/24'
const DEVELOPMENT_MONGO_CONTAINER = 'movie-library-mongo'
const MONGO_IMAGE = 'mongo:3.2'

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


gulp.task('dev:network:create', () => {
  return cmd(`docker network create -d bridge --subnet ${DEVELOPMENT_NETWORK_SUBNET} ${DEVELOPMENT_NETWORK}`)
})

gulp.task('dev:network:rm', async () => {
  const exists = await cmd(`docker network ls -q -f name=${DEVELOPMENT_NETWORK}`)
  if (exists) {
    return cmd(`docker network rm ${DEVELOPMENT_NETWORK}`)
  }
})

gulp.task('dev:mongo:run', () => {
  return cmd(`docker run -d --name ${DEVELOPMENT_MONGO_CONTAINER} --network ${DEVELOPMENT_NETWORK} ${MONGO_IMAGE}`)
})

gulp.task('dev:mongo:rm', async () => {
  const exists = await cmd(`docker ps -a -q -f name=${DEVELOPMENT_MONGO_CONTAINER}`)
  if (exists) {
    return cmd(`docker rm -f ${DEVELOPMENT_MONGO_CONTAINER}`)
  }
})

gulp.task('dev:run', () => {
  return cmd(
    `docker run -d --rm -p 3000:3000 -v %cd%:/opt/project --volumes-from ${DEPENDENCIES_CONTAINER}`
     + ` --name ${DEVELOPMENT_CONTAINER} --network ${DEVELOPMENT_NETWORK} ${DEVELOPMENT_IMAGE}`
  )
})

gulp.task('dev:rm', async () => {
  const exists = await cmd(`docker ps -a -q -f name=${DEVELOPMENT_CONTAINER}`)
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

gulp.task('dev:clean', cb => {
  seq(
    ['dev:rm', 'dev:dep:rm', 'dev:mongo:rm'],
    'dev:network:rm',
    cb
  )
})

gulp.task('dev', cb => {
  seq(
    ['dev:clean'],
    ['dev:dep:create', 'dev:network:create'],
    ['dev:mongo:run', 'dev:run'],
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

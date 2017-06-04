[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![Build Status](https://travis-ci.org/kgruszka/movie-library.svg?branch=master)](https://travis-ci.org/kgruszka/movie-library)
[![Known Vulnerabilities](https://snyk.io/test/github/kgruszka/movie-library/badge.svg)](https://snyk.io/test/github/kgruszka/movie-library)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/5b759953fe0248b1a241bc8700f64e61)](https://www.codacy.com/app/kgruszka/movie-library)

# API docs
API documentation is hosted [here](https://kgruszka.github.io/movie-library/)

# Config
```
cp .env.example .env
```

# Run without Docker

## Requirements
    - Node.js >= 7.10
    - MongoDB

## Install
```
npm install
```

## Setup
Run mongodb and set `MONGO_HOST` && `MONGO_PORT` env vars.

### Optional
Set `PORT` env var for the server. The default is 3000.

## Run
Just execute
```
npm start
```
or for development purpose:
```
npm run-script nodemon
```
`-L` nodemon option is added to provide proper handling in Docker. You can either remove it from `npm nodemon` script
or run nodemon directly:
```
NODE_ENV=development nodemon --watch src src/server.js
```

# Run with Docker
## Requirements
    - Docker >= 1.12.0+

## Setup
Set `MONGO_HOST` and `MONGO_PORT` for MongoDB container.

### Optional
Set `PORT` for the server. The default is 3000.

Run the commands listed below in the project root directory.

## docker-compose

### Build
```
docker-compose build
```

### Start
```
docker-compose up
```

### Destroy
```
docker-compose down -v
```

### Restart server container
```
docker-compose restart app
```
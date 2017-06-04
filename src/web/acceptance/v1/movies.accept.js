/* global describe, before, beforeEach, after, it */
'use strict'
const { assert } = require('chai')
const request = require('supertest')
const fixtures = require('../../../utils/fixtures')
const { createApp } = require('../../../server')
const config = require('../../../config')
const { MongoClient } = require('mongodb')

describe('movies api', function () {
  let db = null
  let app = null

  before(async () => {
    db = await MongoClient.connect(config.mongodb.getUrl('test'))
  })

  beforeEach(async () => {
    const collInfo = await db.listCollections({name: 'movies'}).next()
    if (collInfo) {
      await db.dropCollection('movies')
    }
    const moviesCollection = await db.createCollection('movies')
    const movies = fixtures.movies.load()
    await moviesCollection.insertMany(movies)

    app = await createApp()
  })

  after(async () => {
    if (db) await db.close()
  })

  describe('GET /api/v1/movies', function () {
    it('responds with array of movie items', async function () {
      const expectedMovies = fixtures.movies.load()
      return request(app)
        .get('/api/v1/movies')
        .expect(200)
        .then(response => {
          assert(Array.isArray(response.body), true)
          assert.deepEqual(response.body, expectedMovies)
        })
    })
  })

  describe('POST /api/v1/movies', function () {
    it('responds with id of created movie item', async function () {
      const movies = fixtures.movies.load()
      const movie = movies[0]
      delete movie._id
      return request(app)
        .post('/api/v1/movies')
        .send(movie)
        .expect(201)
        .then(response => {
          assert.isString(response.body._id)
        })
    })

    it('responds with 400 Bad Request for invalid request body', async function () {
      const movies = fixtures.movies.load()
      const invalidPayload = movies[0]
      delete invalidPayload._id
      delete invalidPayload.title
      return request(app)
        .post('/api/v1/movies')
        .send({})
        .expect(400)
        .then(response => {
          assert.strictEqual(response.body.status, 400)
          assert.strictEqual(response.body.message, 'Bad Request')
        })
    })
  })

  describe('GET /api/v1/movies/:id', function () {
    it('responds with specified movie item', async function () {
      const movies = fixtures.movies.load()
      const movie = movies[0]
      return request(app)
        .get(`/api/v1/movies/${movie._id}`)
        .expect(200)
        .then(response => {
          assert.deepEqual(response.body, movie)
        })
    })

    it('responds with 404 Not Found for not existing item', async function () {
      return request(app)
        .get('/api/v1/movies/123q2ert2731d23qw8as0d31')
        .expect(404)
        .then(response => {
          assert.strictEqual(response.body.status, 404)
          assert.strictEqual(response.body.message, 'Not Found')
        })
    })
  })

  describe('DELETE /api/v1/movies/:id', function () {
    it('responds with 204 No Content', async function () {
      const movies = fixtures.movies.load()
      const movie = movies[0]
      return request(app)
        .delete(`/api/v1/movies/${movie._id}`)
        .expect(204)
    })

    it('responds with 404 Not Found for not existing item', async function () {
      return request(app)
        .delete('/api/v1/movies/123q2ert2731d23qw8as0d31')
        .expect(404)
        .then(response => {
          assert.strictEqual(response.body.status, 404)
          assert.strictEqual(response.body.message, 'Not Found')
        })
    })
  })
})

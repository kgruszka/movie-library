/* global describe, before, beforeEach, after, it */
'use strict'
const { assert } = require('chai')
const request = require('supertest')
const fixtures = require('./fixtures');
const app = require('../../index')
const config = require('../../../config')
const { MongoClient } = require('mongodb')
let db = null

describe('movies api', function () {

  before(async () => {
    db = await MongoClient.connect(config.mongodb.getUrl('test'))
  })

  beforeEach(async () => {
    const collInfo = await db.listCollections({name:'movies'}).next()
    if (collInfo) {
      await db.dropCollection('movies')
    }
    const moviesCollection = await db.createCollection('movies')
    await moviesCollection.insertMany(fixtures.movies)
  })

  after(async () => {
    if (db) await db.close()
  })

  describe('GET /api/v1/movies', function () {
    it('responds with array of movie items', async function () {
      return request(app)
        .get('/api/v1/movies')
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
          assert(Array.isArray(response.body), true)
          assert.deepEqual(response.body, fixtures.movies)
        })
    })
  })
})
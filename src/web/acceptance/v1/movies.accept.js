'use strict'
const { assert } = require('chai')
const request = require('supertest')
const app = require('../../index')

describe('movies api', function () {
  describe('GET /api/v1/movies', function () {
    it('responds with array of movie items', async function () {
      return request(app)
        .get('/api/v1/movies')
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
          assert(Array.isArray(response.body), true)
          assert(response.body, [])
        })
    })
  })
})
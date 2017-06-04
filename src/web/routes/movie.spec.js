/* global describe, it */
'use strict'
const { assert } = require('chai')
const MovieRouter = require('./movie')
const { test: { isRouteRegistered, isExpressRouter } } = require('../../utils/index')
const sinon = require('sinon')

describe('movie router', function () {
  function createFakeMovieController () {
    return {
      getAll: sinon.stub(),
      create: sinon.stub()
    }
  }

  it('is express.Router', function () {
    // GIVEN
    const controller = createFakeMovieController()
    const router = MovieRouter(controller)
    // WHEN
    const isRouter = isExpressRouter(router)
    // THEN
    assert.isTrue(isRouter)
  })

  it('registers GET "/" with controller.getAll', function () {
    // GIVEN
    const controller = createFakeMovieController()
    const router = MovieRouter(controller)
    const path = '/'
    const method = 'get'
    // WHEN
    const isRegistered = isRouteRegistered(router, {path, method, handler: controller.getAll})
    // THEN
    assert.isTrue(isRegistered)
  })

  it('registers POST "/" with controller.create', function () {
    // GIVEN
    const controller = createFakeMovieController()
    const router = MovieRouter(controller)
    const path = '/'
    const method = 'post'
    // WHEN
    const isRegistered = isRouteRegistered(router, {path, method, handler: controller.create})
    // THEN
    assert.isTrue(isRegistered)
  })
})

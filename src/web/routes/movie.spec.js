/* global describe, it, beforeEach */
'use strict'
const { assert } = require('chai')
const MovieRouter = require('./movie')
const { test: { isRouteRegistered, isExpressRouter } } = require('../../utils/index')

describe('movie router', function () {
  let router = null
  let controller = {
    getAll: () => {}
  }

  beforeEach(function () {
    router = MovieRouter(controller)
  })

  it('is express.Router', function () {
    const isRouter = isExpressRouter(router)
    assert.isTrue(isRouter)
  })

  it('registers GET "/" with controller.getAll', function () {
    // GIVEN
    const path = '/'
    const method = 'get'
    // WHEN
    const isRegistered = isRouteRegistered(router, {path, method, handler: controller.getAll})
    // THEN
    assert.isTrue(isRegistered)
  })
})

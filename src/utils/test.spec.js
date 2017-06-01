/* globals describe, it */
'use strict'
const { assert } = require('chai')
const express = require('express')
const testUtils = require('./test')

describe('test utils module', function () {
  describe('#isRouteRegistered', function () {
    it('is exported from the module as a property', function () {
      assert.property(testUtils, 'isRouteRegistered')
    })

    it('is a function', function () {
      assert.typeOf(testUtils.isRouteRegistered, 'function')
    })

    it('returns true when route is registered in a router', function () {
      // GIVEN
      const path = '/test'
      const method = 'get'
      const router = express.Router()
      router.get('/test', () => {})
      // WHEN
      const isRegistered = testUtils.isRouteRegistered(router, {path, method})
      // THEN
      assert.isTrue(isRegistered)
    })

    it('returns false when route is registered with different method', function () {
      // GIVEN
      const path = '/test'
      const method = 'put'
      const router = express.Router()
      router.post('/test', () => {})
      // WHEN
      const isRegistered = testUtils.isRouteRegistered(router, {path, method})
      // THEN
      assert.isFalse(isRegistered)
    })
  })

  it('returns false when route is not registered', function () {
    // GIVEN
    const path = '/invalid'
    const method = 'get'
    const router = express.Router()
    router.get('/test', () => {})
    // WHEN
    const isRegistered = testUtils.isRouteRegistered(router, {path, method})
    // THEN
    assert.isFalse(isRegistered)
  })

  it('throws InvalidArgument exception when invalid route argument passed', function () {
    // GIVEN
    const path = 3
    const method = {}
    const router = express.Router()
    // WHEN
    const fn = () => testUtils.isRouteRegistered(router, {path, method})
    // THEN
    assert.throws(fn, Error, 'InvalidArgument')
  })
})

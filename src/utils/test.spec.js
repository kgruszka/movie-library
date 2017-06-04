/* globals describe, it */
'use strict'
const { assert } = require('chai')
const express = require('express')
const testUtils = require('./test')
const { InvalidArgumentError } = require('./errors')

describe('test utils module', function () {
  describe('#isRouteRegistered', function () {
    it('is a function', function () {
      assert.typeOf(testUtils.isRouteRegistered, 'function')
    })

    it('returns true when route is registered at given path', function () {
      // GIVEN
      const path = '/test'
      const method = 'get'
      const handler = () => {}
      const router = express.Router()
      router.get('/test', handler)
      // WHEN
      const isRegistered = testUtils.isRouteRegistered(router, {path, method, handler})
      // THEN
      assert.isTrue(isRegistered)
    })

    it('returns false when route is registered with different method at given path', function () {
      // GIVEN
      const path = '/test'
      const method = 'put'
      const handler = () => {}
      const router = express.Router()
      router.post('/test', handler)
      // WHEN
      const isRegistered = testUtils.isRouteRegistered(router, {path, method, handler})
      // THEN
      assert.isFalse(isRegistered)
    })

    it('returns false when route is registered with different handler at given path', function () {
      // GIVEN
      const path = '/test'
      const method = 'put'
      const handler = () => {}
      const otherHandler = () => {}
      const router = express.Router()
      router.post('/test', otherHandler)
      // WHEN
      const isRegistered = testUtils.isRouteRegistered(router, {path, method, handler})
      // THEN
      assert.isFalse(isRegistered)
    })

    it('returns false when route is not registered at given path', function () {
      // GIVEN
      const path = '/invalid'
      const method = 'get'
      const handler = () => {}
      const router = express.Router()
      router.get('/test', handler)
      // WHEN
      const isRegistered = testUtils.isRouteRegistered(router, {path, method, handler})
      // THEN
      assert.isFalse(isRegistered)
    })

    it('throws InvalidArgumentError when invalid route "path" argument passed', function () {
      // GIVEN
      const path = 3
      const method = 'get'
      const handler = () => {}
      const router = express.Router()
      // WHEN
      const fn = () => testUtils.isRouteRegistered(router, {path, method, handler})
      // THEN
      assert.throws(fn, InvalidArgumentError)
    })

    it('throws InvalidArgumentError when invalid route "method" argument passed', function () {
      // GIVEN
      const path = '/'
      const method = {}
      const handler = () => {}
      const router = express.Router()
      // WHEN
      const fn = () => testUtils.isRouteRegistered(router, {path, method, handler})
      // THEN
      assert.throws(fn, InvalidArgumentError)
    })

    it('throws InvalidArgumentError when invalid route "handler" argument passed', function () {
      // GIVEN
      const path = '/'
      const method = 'get'
      const handler = {}
      const router = express.Router()
      // WHEN
      const fn = () => testUtils.isRouteRegistered(router, {path, method, handler})
      // THEN
      assert.throws(fn, InvalidArgumentError)
    })
  })

  describe('#isExpressRouter', function () {
    it('is exported from the module as a property', function () {
      assert.property(testUtils, 'isExpressRouter')
    })

    it('is a function', function () {
      assert.typeOf(testUtils.isExpressRouter, 'function')
    })

    it('returns true for express router', function () {
      // GIVEN
      const router = express.Router()
      // WHEN
      const isExpressRouter = testUtils.isExpressRouter(router)
      // THEN
      assert.isTrue(isExpressRouter)
    })

    it('returns false for object that is not an express router', function () {
      // GIVEN
      const invalidRouter = {
        get: () => {},
        post: () => {}
      }
      // WHEN
      const isExpressRouter = testUtils.isExpressRouter(invalidRouter)
      // THEN
      assert.isFalse(isExpressRouter)
    })

    it('returns false for non-object', function () {
      // GIVEN
      const invalidRouter = 2
      // WHEN
      const isExpressRouter = testUtils.isExpressRouter(invalidRouter)
      // THEN
      assert.isFalse(isExpressRouter)
    })
  })
})

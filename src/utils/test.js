'use strict'
const express = require('express')
const { InvalidArgumentError } = require('./errors')

function isExpressRouter (router) {
  return Object.getPrototypeOf(router) === express.Router
}

function isRouteRegistered (router, {path, method, handler}) {
  if (typeof path !== 'string') throw new InvalidArgumentError({path})
  if (typeof method !== 'string') throw new InvalidArgumentError({method})
  if (typeof handler !== 'function') throw new InvalidArgumentError({handler})
  return router.stack
    .filter(({route}) => route.path === path && route.methods[method])
    .some(({route}) => route.stack.some(({handle}) => handle === handler))
}

module.exports = {
  isRouteRegistered,
  isExpressRouter
}

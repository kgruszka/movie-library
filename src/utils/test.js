'use strict'
const express = require('express')
const { InvalidArgumentError } = require('./errors')
const EXPRESS_ROUTE_REGEXP_PREFIX = '^'
const EXPRESS_ROUTE_REGEXP_SUFFIX = '/?(?=/|$)'
const EXPRESS_ROUTE_REGEXP_FLAGS = 'i'

function isExpressRouter (router) {
  return Object.getPrototypeOf(router) === express.Router
}

function isRouteRegistered (router, {path, method}) {
  if (typeof path !== 'string') throw new InvalidArgumentError({path})
  if (typeof method !== 'string') throw new InvalidArgumentError({method})
  const routes = router.stack
      .filter(({route}) => route.path === path && route.methods[method])
  return routes.length > 0
}

function isRouterRegistered (router, {path, subRouter}) {
  function isRouterMountedAtRequiredPath ({regexp}) {
    const routePattern = createRoutePattern(path)
    return regexp.toString() === routePattern
  }
  function isRequiredRouterMounted ({handle}) {
    return handle === subRouter
  }

  if (typeof path !== 'string') throw new InvalidArgumentError({path})
  const subRouters = router.stack
    .filter(mountedRouter => isRequiredRouterMounted(mountedRouter) && isRouterMountedAtRequiredPath(mountedRouter))
  return subRouters.length > 0
}

function createRoutePattern (path) {
  const regexpPattern = EXPRESS_ROUTE_REGEXP_PREFIX + path + EXPRESS_ROUTE_REGEXP_SUFFIX
  const regexp = new RegExp(regexpPattern, EXPRESS_ROUTE_REGEXP_FLAGS)
  return regexp.toString()
}

module.exports = {
  isRouteRegistered,
  isRouterRegistered,
  isExpressRouter
}

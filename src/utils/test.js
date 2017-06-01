'use strict'
const { InvalidArgumentError } = require('./errors')

function isRouteRegistered (router, {path, method}) {
  if (typeof path !== 'string') throw new InvalidArgumentError({path})
  if (typeof method !== 'string') throw new InvalidArgumentError({method})
  const routes = router.stack
      .filter(({route}) => route.path === path && route.methods[method])
  return routes.length === 1
}

module.exports = {
  isRouteRegistered
}

'use strict'

function isRouteRegistered (router, {path, method}) {
  if (typeof path !== 'string' || typeof method !== 'string') throw Error('InvalidArgument')
  const routes = router.stack
      .filter(r => r.route.path === path && r.route.methods[method])
  return routes.length === 1
}

module.exports = {
  isRouteRegistered
}

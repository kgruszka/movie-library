'use strict'
const VError = require('verror').VError
const sortQueryParameterRegexp = new RegExp(/^[a-z]+($|:desc$)/)

function MovieController (movieService) {
  async function getAll (req, res, next) {
    try {
      const sortBy = extractSortParameter(req.query.sort)
      const movies = await movieService.getAll({sortBy})
      res.json(movies)
    } catch (err) {
      if (VError.hasCauseWithName(err, 'InvalidSortByParameterError')) {
        console.log(err)
        res.status(400)
        res.json({
          status: 400,
          message: err.message,
          info: VError.info(err)
        })
      }
      next(err)
    }
  }

  async function create (req, res) {
    try {
      const movieId = await movieService.create(req.body)
      res.status(201)
      res.json({_id: movieId})
    } catch (err) {
      if (VError.hasCauseWithName(err, 'InvalidMovieSchemaError')) {
        res.status(400)
        res.json({
          status: 400,
          message: 'Bad Request'
        })
      }
    }
  }

  async function getById (req, res) {
    const movieId = req.params.id
    try {
      const movie = await movieService.getById(movieId)
      if (!movie) {
        res.status(404)
        res.json({
          status: 404,
          message: 'Not Found'
        })
      } else {
        res.status(200)
        res.json(movie)
      }
    } catch (err) {
      res.status(500)
      res.json({
        status: 500,
        message: 'Internal Server Error'
      })
    }
  }

  async function deleteById (req, res) {
    const result = movieService.deleteById(req.param.id)
    if (result) {
      res.status(204)
      res.send()
    } else {
      res.status(500)
      res.json({})
    }
  }
  //
  // async function handleError (err, req, res, next) {
  //   if (err instanceof errors.InternalServerError) {
  //     res.status(500).json({
  //       status: 500,
  //       message: 'Internal Server Error'
  //     })
  //   } else {
  //     next(err)
  //   }
  // }

  function extractSortParameter (queryString) {
    const sortBy = {}
    if (queryString) {
      const query = queryString.toLowerCase()
      if (sortQueryParameterRegexp.test(query)) {
        throw new VError({name: 'InvalidSortByParameterError'}, 'Invalid sort query parameter syntax')
      }
      const queryChunks = query.split(':')
      sortBy.field = queryChunks[0]
      if (queryChunks[1] === 'desc') sortBy.desc = true
    }
    return sortBy
  }

  return {
    getAll,
    create,
    getById,
    deleteById
  }
}

module.exports = (movieService) => {
  return MovieController(movieService)
}

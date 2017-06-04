'use strict'

function MovieController (movieService) {
  async function getAll (req, res) {
    const movies = await movieService.getAll()
    res.json(movies)
  }

  async function create (req, res) {
    const movieId = await movieService.create(req.body)
    res.status(201)
    res.json({_id: movieId})
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

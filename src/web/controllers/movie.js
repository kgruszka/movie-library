'use strict'

function MovieController (movieService) {
  async function getAll (req, res) {
    const movies = await movieService.getAll()
    res.json(movies)
  }

  async function create (req, res) {
    const movieId = await movieService.create(req.body)
    res.status(201)
    res.json({movieId})
  }

  return {
    getAll,
    create
  }
}

module.exports = (movieService) => {
  return MovieController(movieService)
}

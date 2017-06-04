'use strict'

function MovieController (movieService) {
  async function getAll (req, res) {
    const movies = await movieService.getAll()
    res.json(movies)
  }

  return {
    getAll
  }
}

module.exports = (movieService) => {
  return MovieController(movieService)
}

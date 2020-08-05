const express = require('express')
const MoviesService = require('../services/movies')
function moviesApi(app) {
  const router = express.Router()
  const moviesService = new MoviesService()
  app.use('/api/movies', router)

  router.get('/', async function (req, res, next) {
    const { tags } = req.query
    try {
      const movies = await moviesService.getMovies({ tags })
      res.status(200).json(
        {
          data: movies,
          message: 'movies listed'
        }
      )
    } catch (error) {
      next(error)
    }
  })

  router.get('/:movieId', async function (req, res, next) {
    const {movieId} = req.params
    try {
      const movie = await moviesService.getMovie({ movieId })
      res.status(200).json(
        {
          data: movie,
          message: 'movies retrieved'
        }
      )
    } catch (error) {
      next(error)
    }
  })
  router.post('/', async function (req, res, next) {
    const { body: movie }= req
    console.log('ESTO ES LO QUE ESTA EN BODY: ' ,movie)
    try {
      const createMovieId = await moviesService.createMovie({movie})
      res.status(201).json(
        {
          data: createMovieId,
          message: 'movie id created'
        }
      )
    } catch (error) {
      next(error)
    }
  })
  router.delete('/:movieId', async function (req, res, next) {
    const {movieId} = req.params

    try {
      const movie = await moviesService.deleteMovie({movieId})
      res.status(200).json(
        {
          data: movie,
          message: 'movie deleted'
        }
      )
    } catch (error) {
      next(error)
    }
  })
  router.put('/:movieId', async function (req, res, next) {
    const {body: movie}= req
    const {movieId}= req.params
    try {
      const updatedMovie = await moviesService.updateMovie({movieId, movie})
      res.status(200).json(
        {
          data: updatedMovie,
          message: 'movie updated'
        }
      )
    } catch (error) {
      next(error)
    }
  })
}
module.exports = moviesApi
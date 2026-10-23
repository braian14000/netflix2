import { Movie } from '../models/Movie.js'

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('category')
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('category')
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' })
    res.json(movie)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body)
    const savedMovie = await movie.save()
    res.status(201).json(savedMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
import express from 'express'
import { User } from '../models/User.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Obtener los favoritos del usuario autenticado
router.get('/favorites', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites')
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json(user.favorites || [])
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos', error: error.message })
  }
})

// Agregar o quitar de favoritos (Toggle)
router.post('/favorites/:movieId', verifyToken, async (req, res) => {
  try {
    const { movieId } = req.params
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    const index = user.favorites.indexOf(movieId)
    if (index === -1) {
      user.favorites.push(movieId)
    } else {
      user.favorites.splice(index, 1)
    }

    await user.save()
    const updatedUser = await User.findById(req.user.id).populate('favorites')
    res.json(updatedUser.favorites)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar favoritos', error: error.message })
  }
})

export default router
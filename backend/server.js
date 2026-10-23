import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import authRoutes from './src/routes/authRoutes.js'
import movieRoutes from './src/routes/movieRoutes.js'
import categoryRoutes from './src/routes/categoryRoutes.js'
import userRoutes from './src/routes/userRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.URI_LINK)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Servidor backend escuchando en puerto ${PORT}`))
  })
  .catch(err => console.error('Error al conectar MongoDB:', err))
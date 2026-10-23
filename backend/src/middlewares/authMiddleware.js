import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'No hay token, autorización denegada' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Token no válido' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto')
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token no válido o expirado' })
  }
}
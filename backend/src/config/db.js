import mongoose from 'mongoose'
import dns from 'dns'

dns.setDefaultResultOrder('ipv4first')
dns.setServers(['8.8.8.8', '8.8.4.4'])

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI_LINK)
    console.log(`🟢 MongoDB Conectado: ${conn.connection.host}`)
  } catch (error) {
    console.error(`🔴 Error de conexión a MongoDB: ${error.message}`)
    process.exit(1)
  }
}
import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  bannerUrl: { type: String },
  videoUrl: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  isFeatured: { type: Boolean, default: false },
  releaseYear: { type: Number },
  duration: { type: String },
  type: { type: String, enum: ['movie', 'series'], default: 'movie' }
}, { timestamps: true })

export const Movie = mongoose.model('Movie', movieSchema)
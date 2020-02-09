import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({ timestamps: true })

export const Item = mongoose.model('product', itemSchema)
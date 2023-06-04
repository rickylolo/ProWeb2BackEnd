const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  text: { type: String, required: true },
  score: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const Reviews = mongoose.model('Review', ReviewSchema)

module.exports = Reviews

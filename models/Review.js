const mongoose = require('mongoose')

const Reviews = mongoose.model('Review', {
  text: { type: String, required: true },
  score: { type: String, required: true },
})

module.exports = Reviews

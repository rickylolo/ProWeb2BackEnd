const mongoose = require('mongoose')

const Lists = mongoose.model('List', {
  name: { type: String, required: true },
  user_ID: { type: String, required: true },
})

module.exports = Lists

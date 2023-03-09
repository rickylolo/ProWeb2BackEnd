const mongoose = require('mongoose')

const Products = mongoose.model('Product', {
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  user_ID: { type: String, required: true },
})

module.exports = Products

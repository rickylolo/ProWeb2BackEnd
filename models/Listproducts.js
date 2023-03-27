const mongoose = require('mongoose')

const Listsproducts = mongoose.model('Listproduct', {
  quantity: { type: String, required: true },
  list_ID: { type: String, required: true },
  product_ID: { type: String, required: true },
})

module.exports = Listsproducts

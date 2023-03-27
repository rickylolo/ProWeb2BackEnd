const mongoose = require('mongoose')

const Productcategories = mongoose.model('Productcategory', {
  category_ID: { type: String, required: true },
  product_ID: { type: String, required: true },
})

module.exports = Productcategories
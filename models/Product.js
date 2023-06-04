const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const Products = mongoose.model('Product', ProductSchema)

module.exports = Products

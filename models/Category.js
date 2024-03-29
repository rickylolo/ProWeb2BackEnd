const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
})
const Categories = mongoose.model('Category', CategorySchema)

module.exports = Categories

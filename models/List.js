const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ListSchema = new Schema({
  name: { type: String, required: true },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  quantity: { type: Number, required: true },
})

const Lists = mongoose.model('List', ListSchema)

module.exports = Lists

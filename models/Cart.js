const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Carts = mongoose.model('Cart', CartSchema)

module.exports = Carts

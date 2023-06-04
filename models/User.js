//Modulo mongoose
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  userType: { type: String, required: true },
  salt: { type: String, required: true },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'List',
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
})

// Creo modelo de usuario
const Users = mongoose.model('User', UserSchema)

module.exports = Users

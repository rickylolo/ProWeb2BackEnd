const mongoose = require('mongoose')

const Carts = mongoose.model('Cart',{
    quantity:{type:String, required:true},
    product_ID:{type:String, required:true},
    user_ID:{type:String, required:true}
})

module.exports = Carts
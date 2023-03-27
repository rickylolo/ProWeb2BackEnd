const mongoose = require('mongoose')

const Multimedias = mongoose.model('Multimedia',{
    content:{type:String, required:true},
    type:{type:String, required:true},
    product_ID:{type:String, required:true}
})

module.exports = Multimedias
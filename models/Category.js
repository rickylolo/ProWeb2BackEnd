const mongoose = require('mongoose')

const Categories = mongoose.model('Category',{
    name:{type:String, required:true},
    description:{type:String, required:true},
    user_ID:{type:String, required:true}
})

module.exports = Categories
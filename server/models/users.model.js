const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    address:{
        type:String
    },
    balance:{
        type:Number,
        required:[true,"Initial Balance required"]
    }
},{
    timestamps:true
})

const userModel = mongoose.model('users',userSchema)
module.exports = userModel
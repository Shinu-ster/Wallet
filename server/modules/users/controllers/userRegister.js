const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userRegister = async (req,res)=>{
    const Users = mongoose.model("users");
    const {name,email,password,balance,address} =req.body
    const encryptedPassword = await bcrypt.hash(password,10);
    try {
        const createuser = await Users.create({
            name,
            email,
            password: encryptedPassword,
            balance:0,
            address
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
        return;
    }



    console.log(req.body)
    res.status(200).json({
        status:"Register",
    })
}
module.exports = userRegister;
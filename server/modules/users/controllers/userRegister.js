const mongoose = require('mongoose');



const userRegister = async (req,res)=>{
    const Users = mongoose.model("users");
    const {name,email,password,balance,address} =req.body

    try {
        const createuser = await Users.create({
            name,
            email,
            password,
            balance:0
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
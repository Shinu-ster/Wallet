const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userLogin =  ( async  (req,res)=>{
    const Users = mongoose.model("users");

    const {email,password} = req.body;
    try {
        
        //validation
        if (!email) throw "Please provide email";
        if(!password ) throw "Please Provide Password";

        const getUser = await Users.findOne({
            email
        })
        if(!getUser) throw "Email doesn't exists";

        const matched = await bcrypt.compare(password,getUser.password);
        if(!matched) throw "Email and Password donot match";
    } catch (error) {
      res.status(400).json({
        status:"Failed",
        message: error
       });
       return;
    }


    console.log(req.body)
    res.status(200).json({
        status:"Logined Succesfully",
    })
})
module.exports = userLogin;
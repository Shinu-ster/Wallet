const mongoose = require('mongoose');


const userDashboard = async(req,res)=>{
    const Users = mongoose.model("users");
    let getUser;
    try {
        getUser = await Users.findOne({
           _id: req.user._id
        }).select("balance")
    } catch (error) {
        
    }

    console.log(req.user)
    res.status(200).json({
        data: getUser
    })
}

module.exports = userDashboard;
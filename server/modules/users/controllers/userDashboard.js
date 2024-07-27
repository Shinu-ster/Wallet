const mongoose = require('mongoose');


const userDashboard = async(req,res)=>{
    const Users = mongoose.model("users");
    const Transaction = mongoose.model("transactions")

    let getUser;
    const getTransaction = await Transaction.find({
        user_id:req.user._id,
    }).sort('-createdAt').select("amount remark createdAt transaction_type")
    try {
        getUser = await Users.findOne({
           _id: req.user._id
        }).select("balance")
    } catch (error) {
        
    }

    console.log(req.user)
    res.status(200).json({
        data: getUser,
        transactions: getTransaction
    })
}

module.exports = userDashboard;
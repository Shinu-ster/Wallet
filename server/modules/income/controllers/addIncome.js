const mongoose = require("mongoose");


const addIncome = async(req,res)=>{

    const {amount,remark} = req.body;
    const Users = mongoose.model("users");

    try {
        if(!amount || !remark) throw "Please enter both amount and remark";
        if(amount <= 0) throw "Please enter valid amount";     
        if(remark.length < 2) throw "Remark should atleast be 2 character long";    
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error
        })
        return;
    }

    await Users.updateOne({
        _id:req.user._id
    },{
        $inc:{

            balance:amount
        }
    },{
        runValidators:true
    })

    res.status(200).json({
        status:"Income was updated"
    })

}

module.exports = addIncome;
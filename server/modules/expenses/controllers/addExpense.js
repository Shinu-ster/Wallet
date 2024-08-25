const mongoose = require("mongoose");


const addExpense = async(req,res)=>{

    const {amount,remark} = req.body;
    const Users = mongoose.model("users");
    const Transactions = mongoose.model("transactions");

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

    try {
        await Transactions.create({
          amount: amount,
          remark: remark,
          user_id: req.user._id,
          transaction_type:"expense",
        });
        await Users.updateOne(
          {
            _id: req.user._id,
          },
          {
            $inc: {
              balance: amount * -1,
            },
          },
          {
            runValidators: true,
          }
        );
      } catch (e) {
        res.status(400).json({
          status: "Failed",
          message: e.message,
        });
        return;
      }
    

    res.status(200).json({
        status:"Expense was added"
    })

}

module.exports = addExpense;
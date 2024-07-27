const mongoose = require("mongoose");

const addIncome = async (req, res) => {
  const { amount, remark, transaction_type } = req.body;
  const Users = mongoose.model("users");
  const Transactions = mongoose.model("transactions");

  try {
    if (!amount || !remark || !transaction_type)
      throw "Please enter amount and remark and transaction";
    if (amount <= 0) throw "Please enter valid amount";
    if (remark.length < 2) throw "Remark should atleast be 2 character long";
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error,
    });
    return;
  }

  try {
    await Transactions.create({
      amount: amount,
      remark: remark,
      user_id: req.user._id,
      transaction_type,
    });
    await Users.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        runValidators: true,
      }
    );
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
    return;
  }

  res.status(200).json({
    status: "Income was updated",
  });
};

module.exports = addIncome;

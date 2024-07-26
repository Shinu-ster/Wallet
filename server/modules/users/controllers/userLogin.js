const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const Users = mongoose.model("users");
  let getUser;
  const { email, password } = req.body;
  try {
    //validationJSON.stringify
    if (!email) throw "Please provide email";
    if (!password) throw "Please Provide Password";

    getUser = await Users.findOne({
      email,
    });
    if (!getUser) throw "Email doesn't exists";

    const matched = await bcrypt.compare(password, getUser.password);
    if (!matched) throw "Email and Password donot match";
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error,
    });
    return;
  }

  const accessToken = jwt.sign(
    {
      _id: getUser._id,
      email: getUser.email,
      password: getUser.password,
      name: getUser.name,
    },
    process.env.jwt_salt,
    {expiresIn: "30 days"}
  );

  console.log(req.body);
  res.status(200).json({
    status: "Logined Succesfully",
    accessToken,
  });
};
module.exports = userLogin;

const express = require("express");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);


//middileware
userRouter.use(auth);

//next()
//Protected Route
userRouter.get("/show-balance", userDashboard);


module.exports = userRouter;

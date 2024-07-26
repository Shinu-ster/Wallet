const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./modules/users/users.routes");
const cors = require('cors');
const incomeRouter = require("./modules/income/income.routes");
const app = express();
require("dotenv").config();

require('./models/users.model')


mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => {
    console.log("Connection to mongo failed", e);
  });

  app.use(cors());
  app.use(express.json());
  app.use("/users",userRouter);
  app.use("/income",incomeRouter);

  

app.listen(8000, () => {
  console.log("Server started successfully");
});

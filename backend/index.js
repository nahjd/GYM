const express = require("express");
const app = express();
const port = process.env.MONGODB_URI || 3030;
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./router/router");
// const adminRouter = require("./router/adminRouter");

require("dotenv").config();
require("./config/db");

app.use(cors());
app.use(bodyParser.json());
app.use("/", userRouter);
// app.use("/", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

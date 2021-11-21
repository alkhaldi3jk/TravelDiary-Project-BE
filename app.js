const express = require("express");
const connectDB = require("./db/database");
connectDB();

const app = express();





app.listen(8005, () => {
    console.log("The application is running on localhost:8005");
  });
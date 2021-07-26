require("dotenv").config();
const express = require("express");
const app = express();
console.log(process.env.DATABASE_URL);
module.exports = app;

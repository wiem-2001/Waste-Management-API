// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Create Express app
const app = express();

// Routes
const authRoutes=require('./src/routes/auth');

// Middlewares
// const middlewares = require('./middlewares');  

// Config
dotenv.config();



// Middleware
app.use(bodyParser.json());
app.use(cors());

// local APIs
app.use('/api', authRoutes);


// DATABASE CONNECTION
mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? process.env.PROD_DATABASE
      : process.env.DEV_DATABASE,
    {
      dbName: "Waste-Management",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });



module.exports = app;

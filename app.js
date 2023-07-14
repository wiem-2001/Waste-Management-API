// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Routes
// const routes = require('./routes');

// Middlewares
// const middlewares = require('./middlewares');

// Local APIs
// const localAPIs = require('./localAPIs');

// Config
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

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

// Routes
// app.use('/api', routes);

module.exports = app;

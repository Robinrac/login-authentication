require("dotenv").config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const helmet = require("helmet");

const dataRoutes = require('./routes/userRoutes');

const app = express();
app.use(helmet())
app.use(cors());
app.use(bodyParser.json());
app.use('/data', dataRoutes);

async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("------------You have successfully connected MONGO DB------------");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
}

connectToDatabase();

module.exports = app;
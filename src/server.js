const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const dataRoutes = require('./routes/data_routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/data', dataRoutes);

module.exports = app;
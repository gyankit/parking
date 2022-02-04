const express = require('express');
const db = require('./config/database');
const apiRoutes = require('./routes/api.route')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.connect();

app.use('/api', apiRoutes);

module.exports = app;
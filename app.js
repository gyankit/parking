const express = require('express');
//const path = require('path');
const db = require('./config/database');
const apiRoutes = require('./routes/api.route')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, './views')));

db.connect();

app.use('/api', apiRoutes);

module.exports = app;
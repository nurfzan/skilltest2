var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();


const routes = require("./src/routes");
const {sequelize} = require('./src/models');
// sequelize.sync({force:true});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

module.exports = app;

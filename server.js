/*
* @Author: kokarat
* @Date:   2016-02-21 14:26:27
* @Last Modified by:   kokarat
* @Last Modified time: 2016-02-21 14:26:31
*/

'use strict';

var runningPort = 3000;
// Set environment mode
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
Require
*/
var express = require('./config/express');
var mongoose = require('./config/mongoose');
var passport = require('./config/passport');

var db = mongoose();// เรียกให้ connect mongoose
var app  = express();
var passport = passport(); // เรียกใช้งาน passport

app.listen(runningPort);
module.exports = app;

console.log('Server running at http://localhost:'+runningPort);

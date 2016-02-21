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

var express = require('./config/express');
var app  = express();
app.listen(runningPort);
module.exports = app;

console.log('Server running at http://localhost:'+runningPort);

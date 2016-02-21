/*
require
*/
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser  = require('body-parser');
var sass  = require('node-sass-middleware');
var validator = require('express-validator');
var cookieSession = require('cookie-session');


module.exports = function(){
  var app = express();

  //use cookie session
  app.use(cookieSession({
      name: 'session',
      keys: ['D99xZcEKW9','3F72FZB33MR3X4Nh9MHBHvUe7IiYlo78']
  }));

  // พิมพ์ ดูได้ใน terminal echo $NODE_ENV
  if(process.env.NODE_ENV === 'development'){
    //ใช้ morgan ในการ debug
    app.use(morgan('dev'))
  }else {
    //ใช้ compression แบบอัด
    app.use(compression);
  }

  // Body parse จาก string
  app.use(bodyParser.urlencoded({
    extended:true
  }));

  // Validator form
  app.use(validator());

  // Body parser จาก json  ตอน post
  app.use(bodyParser.json());

  // Use Jade template
  app.set('views','./app/views');
  app.set('view engine','jade');


  /**
  =========================================================
  Routes                                                
  =========================================================
  **/
  require('../app/routes/index.routes')(app);
  require('../app/routes/user.routes')(app);

  // SASS
  app.use(sass({
    src:  './sass',
    dest: './public/css',
    debug: true,
    outputStyle: 'compressed', //compact,expanded,compressed
    prefix: '/css'

  }));

  // Use static files
  app.use(express.static('./public'));

  return app;
};

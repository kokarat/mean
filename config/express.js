var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser  = require('body-parser');


module.exports = function(){
  var app = express();

  // พิมพ์ ดูได้ใน terminal echo $NODE_ENV
  if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
  }else {
    app.use(compression);
  }

  // Body parse จาก string
  app.use(bodyParser.urlencoded({
    extended:true
  }));

  // Body parser จาก json  ตอน post
  app.use(bodyParser.json());

  require('../app/routes/index.routes')(app);
  return app;
};

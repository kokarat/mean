var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser  = require('body-parser');
var sass  = require('node-sass-middleware');


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

  // Use Jade template
  app.set('views','./app/views');
  app.set('view engine','jade');


  /**
  Routes
  **/
  require('../app/routes/index.routes')(app);

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

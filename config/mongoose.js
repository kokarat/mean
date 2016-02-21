var config = require('./config');
var mongoose = require('mongoose');

module.exports = function(){
  mongoose.set('debug',config.debug);
  var db  = mongoose.connect(config.mongoDBuri);

  //เรียกใช้งาน  models
  require('../app/models/user.model');

  return db;
};

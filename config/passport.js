var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function(){

    var User = mongoose.model('User');

    //ส่ง session ไปเก็บ server
    passport.serializeUser(function(user,done){

        done(null,user.id);

    });

    //รับ session
    passport.deserializeUser(function(id,done){

            User.findOne({
                _id: id
            },
                '-password -salt',function(err,user){
                done(err,user);
            });
    });

    // เรียกใช้งาน local strategies
    require('./strategies/local.js')();
    require('./strategies/facebook.js')();
    require('./strategies/google.js')();

};
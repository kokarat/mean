module.exports = function(app){

  var user = require('../controllers/user.controller');

  //Sign up
  app.route('/signup')
     .get(user.signupView)
     .post(user.signup);

  //login & logout
  app.post('/login',user.login);
  app.post('/logout',user.logout);

  // users
  app.route('/user')
     .post(user.store)
     .get(user.index);

  // Find one
  app.route('/user/:username')
     .get(user.show)
     .put(user.update)
     .delete(user.destroy);

  //เตรียมข้อมูลเอาไว้รอ
  app.param('username',user.userByUsername);

};

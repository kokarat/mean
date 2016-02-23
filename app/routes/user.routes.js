var user = require('../controllers/user.controller');
var passport = require('passport');

module.exports = function(app){

    /**
     * oauth
     * @type {exports|module.exports}
     */

    /**
     * Facebook
     */
    app.get('/oauth/facebook',passport.authenticate('facebook',{
        scope: ['email','manage_pages','public_profile'],
        failureRedirect: '/login'

    }));
    app.get('/oauth/facebook/callback',passport.authenticate('facebook',{
        failureRedirect: '/login',
        successRedirect: '/'
    }));


    /**
     * Google
     */
    app.get('/oauth/google',passport.authenticate('google',{
        scope:[
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        failureRedirect: '/login'
    }));
    app.get('/oauth/google/callback',passport.authenticate('google',{
        failureRedirect: '/login',
        successRedirect: '/'
    }));


    //Sign up
    app.route('/signup')
        .get(user.signupView)
        .post(user.signup);

    //login & logout
    app.route('/login')
        .get(user.loginView)
        .post(passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        }));


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

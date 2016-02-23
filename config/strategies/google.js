var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');
var user = require('../../app/controllers/user.controller');
var provider = 'google';

module.exports = function(){

    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback: true
    },function(req,accessToken,refreshToken,profile,done){

        var providerData = profile._json;

        console.log('raw:'+ profile._raw);
        console.log('json:'+ providerData);


        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        var providerUserProfile = {
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: provider,
            providerId: profile.id,
            providerData: providerData
        };
        user.saveOAuthUserProfile(req,providerUserProfile,done);

    }));

};
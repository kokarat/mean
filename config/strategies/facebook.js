var passport = require('passport');
var FacebookStategy = require('passport-facebook').Strategy;
var config = require('../config');
var user = require('../../app/controllers/user.controller');
var provider = 'facebook';

module.exports = function(){



    passport.use(new FacebookStategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        //profileFields: ['id','email','name'],
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
            email: profile.email,
            username: profile.username,
            provider: provider,
            providerId: profile.id,
            providerData: providerData
        };
        user.saveOAuthUserProfile(req,providerUserProfile,done);

    }));

};
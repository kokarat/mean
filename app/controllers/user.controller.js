var User = require('mongoose').model('User');

/**
 * find one
 * @param req
 * @param res
 * @param next
 * @param username
 */
exports.userByUsername = function(req,res,next,username){

    User.findOne({
        username: username
    },function(err,user){

        if(err){
            return next(err);
        }else{
            req.user = user;
            next();
        }

    });
};

/**
 * Show
 */
exports.show = function(req,res){
    res.json(req.user);
};


/**
 Lists all users
 */
exports.index = function(req,res,next){

    User.find({},function(err,users) {

        if(err){
            return next(err);
        }else{
            res.json(users);
        }
    });

};

/**
 Insert data to database
 */
exports.store = function(req,res,next){
    var user = new User(req.body); // ส่งเข้าไปเป็น JSON

    //save data
    user.save(function(err){

        if(err){
            return next(err);
        }else{
            res.json(user)
        }

    });

};

/**
 * Update via username
 * @param req
 * @param res
 * @param next
 */
exports.update = function(req,res,next){

    User.findOneAndUpdate({
        username: req.user.username,
    },
        req.body,function(err,user){

            if(err){
                return next(err);
            }else {
                res.json(user);
            }
    });

};

/**
 * Remove by username param
 * @param req
 * @param res
 * @param next
 */
exports.destroy = function(req,res,next){

   req.user.remove(function(err){

       if(err){
           return next(err);
       }else{
           res.json(req.user);
       }

   });

};



exports.loginView = function(req,res){

    if(!req.user){

        res.render('login',{
           title: 'Login',
           messages: req.flash('error') || req.flash('info')
        });

    }else{
        return res.redirect('/');
    }
};

/**
 Logout
 */
exports.logout = function(req,res){

    req.logout();
    res.redirect('/');


};

/**
 * Return sign up page
 * @param req
 * @param res
 */
exports.signupView = function(req,res){

    if(!req.user){

        res.render('signup',{
            title: 'Sign up',
            messages: req.flash('error')
        });

    }else{
        return res.redirect('/');
    }

};


/**
 * Sign up
 * @param req
 * @param res
 */
exports.signup = function(req,res){

    if(!req.user){
        // Insert to database with data from
        var user = new User(req.body);
        user.provider = 'local';

        user.save(function(err){

            if(err){

                var message = getErrorMessage(err);

                req.flash('error',message);
                return res.redirect('/signup');
            }

            // Method login จะมากับ passport
            req.login(user,function(err){

                if(err) return next(err);

                return res.redirect('/');

            });

        });

    }else{
        return res.redirect('/');
    }
};

/**
 * Error code handle
 * @param err
 * @returns {string}
 */
var getErrorMessage = function(err){

    var message = '';

    //mongoose error code
    if(err.code){
        switch (err.code){
            case 11000 :
            case 11001 :
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    }else{
        for (var errName in err.errors){

            if(err.errors[errName].message){
                message = err.errors[errName].message;
            }
        }
    }

    return message;
};

/**
 *  Save user from provider
 * @param req
 * @param profile
 * @param done
 */
exports.saveOAuthUserProfile = function(req,profile,done){

    User.findOne({
      provider: profile.provider,
      provideId: provider.provideId
    },function(err,user){

        if(err){
            return done(err);
        } else {
            if(!user){

                var possibleUsername = profile.username || (profile.email ? profile.email.split('@')[0]: '');

                User.findUniqueUsername(possibleUsername,null,function(availableUsername){

                    profile.username = availableUsername;
                    user = new User(profile); //save to database
                    user.save(function(err){
                        if(err){
                            var message = getErrorMessage(err);
                            req.flash('error',message);
                            return res.redirect('/signup');
                        }
                    });

                    return done(err,user); // save complete and return

                });

            }else{
                return done(err,user);
            }
        }

    });
};
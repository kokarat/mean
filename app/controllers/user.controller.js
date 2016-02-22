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


/**
 Login
 */
exports.login = function(req,res){

    console.log(req.body);

    // Set session ถ้าคลิกปุ่ม remember
    if(req.body.remember === 'remember'){
        req.session.remember = true;
        req.session.email = req.body.email;
    }

    //Validator
    req.checkBody('email','Invalid email').notEmpty().isEmail();
    //req.sanitizeBody('email').normalizeEmail(); //ทำให้อยู่ในรูปแบบที่เราอยากได้ เช่นทำให้เป็นตัวเล็กหมด
    var error = req.validationErrors(); // ถ้าไม่ error  จะไม่มีค่า

    console.log(req.body.email);

    if(error){
        res.render('index',{
            title: 'Errors:' + JSON.stringify(error),// JSON.stringify => แปลง JSON เป็น string
            isLoggedIn: false
        });
        return;
    }

    res.render('index',{
        title: 'Logged in as '+ req.body.email,
        isLoggedIn:true
    });
};

/**
 Logout
 */
exports.logout = function(req,res){

    // Clear session
    req.session = null;

    res.render('index',{
        title: 'See you later',
        isLoggedIn:false
    });

}

/*
* @Author: kokarat
* @Date:   2016-02-21 14:29:31
* @Last Modified by:   kokarat
* @Last Modified time: 2016-02-21 15:00:05
*/


exports.render = function(req,res){

	var isLoggedIn = false;

	if(typeof req.session.remember !== 'undefined'){
		isLoggedIn = req.session.remember;
	}

	//res.send('Hello world');
	res.render('index',{
		title: 'Hello world',
		isLoggedIn: isLoggedIn
	});
};

exports.store = function(req,res){
	res.statusCode = 201;
	res.json({"status_code":201,"message":"Data saved"});
};

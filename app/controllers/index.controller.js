/*
* @Author: kokarat
* @Date:   2016-02-21 14:29:31
* @Last Modified by:   kokarat
* @Last Modified time: 2016-02-21 15:00:05
*/


exports.render = function(req,res){

	res.render('index',{
		title: 'Hello world',
		username: req.user  ? req.user.username : ''
	});

};

exports.store = function(req,res){
	res.statusCode = 201;
	res.json({"status_code":201,"message":"Data saved"});
};

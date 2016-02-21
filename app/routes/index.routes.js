/*
* @Author: kokarat
* @Date:   2016-02-21 14:31:43
* @Last Modified by:   kokarat
* @Last Modified time: 2016-02-21 14:34:06
*/

'use strict';

module.exports = function(app){
	var index = require('../controllers/index.controller');

	//Call reder fuctions in index.controller
	app.route('/')
	.get(index.render)
	.post(index.store);
};

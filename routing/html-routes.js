var orm = require('../config/orm.js');
var UserAdd = require('../config/user.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function User (userObj) {
	this.username = userObj.username
	this.password = userObj.password
}

module.exports = User

module.exports.saveUser = function(userObj, callback){
	orm.addUserToDB(userObj, function(status, err){
		if (err) return callback(false);
		callback(true);
	});
}

// ************************************************

module.exports = function(app){

// Main Route. This route will redirect to our rendered React application

	app.get('/', function(req, res){
		
			res.render('login', {
				layout: 'main',
			});

	});


}


var orm = require('../config/orm.js');
var UserAdd = require('../config/user.js');
var passport = require('passport');
var mongojs = require('mongojs');
var LocalStrategy = require('passport-local').Strategy;


// MongoDB Configuration configuration
var databaseUrl = 'Classroom';
var collections = ["posts"];

// use mongojs to hook the database to the db variable 
var db = mongojs(databaseUrl, collections);

db.on('error', function (err) {
  console.log('MongoDB Error: ', err);
});



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


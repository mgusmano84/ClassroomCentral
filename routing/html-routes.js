// var orm = require('../config/orm.js');


module.exports = function(app){

// Main Route. This route will redirect to our rendered React application

	app.get('/', function(req, res){
		
			res.render('login', {
				layout: 'main',
			});

	});


}


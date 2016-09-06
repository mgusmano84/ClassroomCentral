var orm = require('../config/orm.js');
var UserAdd = require('../config/user.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Setting the strategy for Passport
passport.use(new LocalStrategy({passReqToCallback : true},
  function(req, username, password, done) {

  	//Searching the ORM for the user in the database
  	orm.findUser(username, function(err, user){
  		console.log (user);
  		user = user[0];
  		if (err) { return done(err); }
      if (!user) { return done(null, false); }

      //comparing user passwords - return if not a match
      if (password !== user.password) { return done(null, false);}

      return done(null, user);
  	});
  }
));

//These two methods are required to keep the user logged in via the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// ************************************************

module.exports = function(app){

	// GET Routes

// Main Route. This route will redirect to our rendered React application

	app.get('/', function(req, res){
		
			res.render('login', {
				layout: 'main',
				actionPush: 'signin',
				otherAction: "ForTeachers"
			});

	});

	app.get('/signin', function(req, res){
		res.redirect('/')
	});

	// app.get('/signup', function(req, res){
	// 	res.render('login', {
	// 		layout: 'main',
	// 		newPass: "Enter Credentials",
	// 		actionPush: 'signup',
	// 		otherAction: "Signin"
	// 	});
	// });	

		app.get('/forteachers', function(req, res){
		res.render('teachercreate', {
			layout: 'main',
			newPass: "Enter Credentials",
			actionPush: 'forteachers',
			otherAction: "Signin"
		});
	});

	// app.get('/newuser', function(req, res) {
	// 	res.render
	// })


	app.get('/userpage', function(req,res){
		console.log('req.user is',req.user)
		if (req.isAuthenticated()) {
			res.render('userpage', {
				layout: 'user',
				username: req.user.username,
				isTeacher: req.user.isTeacher,
				email: req.user.email
			})
		} else {
			res.redirect('/')
		}
	});	

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	// POST Routes	

	app.post('/signin', passport.authenticate('local',{failureRedirect:'/', failureFlash:'Wrong Username or Password'}), function(req, res){
		res.redirect('/userpage');
	});	

	app.post('/forteachers', function(req, res){
		var user = new UserAdd(req.body);
		user.isTeacher = true;
		UserAdd.saveUser(user, function(status){
			if(!status) {
				res.redirect('/forteachers')
				return false
			}
			res.redirect('/');
		});
	});	

	app.post('/addPost', function(req, res){
			console.log('is it there?' + req.user);

			// orm.makePost(req.body.post, req.user.userId);


		// var userId = req.user.userId;
	});

	app.get('/managestudents', function(req, res){
		// var userId = req.user.userId;
		// var isTeacher = req.user.isTeacher;
		var userPull = [];
		userPull = orm.displayUsers();
		console.log("check this out: " + userPull);
		//  
		if (req.isAuthenticated()) {
			res.render('addusers', {
				layout: 'user',
				username: req.user.username,
				isTeacher: req.user.isTeacher,
				email: req.user.email,
				users: userPull
			})
		} else {
			res.redirect('/')
		}		
	});

		app.post('/managestudents', function(req, res){
		var user = new UserAdd(req.body);
		user.isTeacher = false;
		UserAdd.saveUser(user, function(status){
			if(!status) {
				res.redirect('/forteachers')
				return false
			}
			res.redirect('/managestudents');
		});
	});	



}


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
		console.log('req.user is',req.user);
		orm.displayPost(req.user.classId, function(results){
		if (req.isAuthenticated()) {
			res.render('userpage', {
				layout: 'user',
				username: req.user.username,
				isTeacher: req.user.isTeacher,
				email: req.user.email,
				posts: results
			})
		} else {
			res.redirect('/')
		}
	});
	});	



		// // var userId = req.user.userId;
		// // var isTeacher = req.user.isTeacher;
		// orm.displayUsers(req.user.classId, function(results){
		// 	console.log("check this out: " + results);
		// 	if (req.isAuthenticated()) {
		// 	res.render('addusers', {
		// 		layout: 'user',
		// 		username: req.user.username,
		// 		isTeacher: req.user.isTeacher,
		// 		email: req.user.email,
		// 		userData: results
		// 	})
		// } else {
		// 	res.redirect('/')
		// }	
		// });










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

    app.post('/adduser', function(req, res){
        var user = new UserAdd(req.body);
                user.classId = req.user.classId;
                user.email = req.user.email;
        user.isTeacher = false;
        UserAdd.saveUser(user, function(status){
            if(!status) {
                res.redirect('/managestudents')
                return false
            }
            res.redirect('/managestudents');
        });
    });	

	app.post('/addPost', function(req, res){

			console.log('body' + req.body.post)
			console.log('user' + req.user.userId);
			// req.user.classId = req.user.classId;

			if(req.isAuthenticated()){
			orm.makePost(req.body.post, req.user.userId, req.user.classId);
		}
		else {

			res.redirect('/');
		}

	});

	app.get('/managestudents', function(req, res){
		// var userId = req.user.userId;
		// var isTeacher = req.user.isTeacher;
		orm.displayUsers(req.user.classId, function(results){
			console.log("check this out: " + results);
			if (req.isAuthenticated()) {
			res.render('addusers', {
				layout: 'user',
				username: req.user.username,
				isTeacher: req.user.isTeacher,
				email: req.user.email,
				userData: results
			})
		} else {
			res.redirect('/')
		}	
		});
	});

	// This will open the editing section for teachers to add homework
		app.get('/homework', function(req, res){

		if (req.isAuthenticated()) {
			res.render('homework', {
				layout: 'user',
				username: req.user.username,
				isTeacher: req.user.isTeacher,
				email: req.user.email,
			})
		} else {
			res.redirect('/')
		}		
	});	

		app.post('/homework', function(req, res){

			console.log('body' + req.body.post)
			console.log('user' + req.user.userId);

			if(req.isAuthenticated()){
			orm.homeworkPost(req.body.post, req.user.userId);
		}
		else {

			res.redirect('/');
		}

	});

		app.post('/newEvents', function(req, res){

			console.log('body' + req.body.post)
			console.log('user' + req.user.userId);

			if(req.isAuthenticated()){
			orm.eventPost(req.body.post, req.user.userId);
		}
		else {

			res.redirect('/');
		}

	});		



}


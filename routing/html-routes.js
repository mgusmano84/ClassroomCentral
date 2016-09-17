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
	// Direct user to homepage to sign in
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

	// Directs to main userpage to view content
	app.get('/userpage', function(req,res){

		userMainid = req.user.classId;
		userLable= req.user.username;

		orm.displayHomework(userMainid, function(resultsHomework){	
		orm.displayEvents(userMainid, function(resultsEvents){	
		orm.displayPost(userMainid, function(results){
			console.log("I made it");
		if (req.isAuthenticated()) {
			res.render('userpage', {
				layout: 'user',
				// username1: userlogged,
				isTeacher: req.user.isTeacher,
				email: req.user.email,
				posts: results,
				homework: resultsHomework,
				events: resultsEvents,
				nameuse: userLable
			})

		} else {
			res.redirect('/')
		}
		});
		});
		});
	});	


	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	// Posts to user creation	
	app.post('/signin', passport.authenticate('local',{failureRedirect:'/', failureFlash:'Wrong Username or Password'}), function(req, res){
		res.redirect('/userpage');
	});	

	// Allows teacher to be created
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

	// Allows teacher to create a user
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

    // Allows the user logged in to make a post
	app.post('/addPost', function(req, res){

			console.log('body' + req.body.post)
			console.log('user' + req.user.userId);
			// req.user.classId = req.user.classId;

			if(req.isAuthenticated()){
			orm.makePost(req.body.post, req.user.userId, req.user.classId, req.user.username);
		}
		else {

			res.redirect('/');
		}

	});

	// Allows user to delete post
		app.post('/deletePost', function(req, res){

			console.log('req', req.body)
			if(req.isAuthenticated()){
				orm.deletePost(req.body.msg_id, function(results){
				res.send('deleted!') 	
				});
			}	
		else {

			res.redirect('/');
		}
		
		});

		// Allows the teacher to delete user
		app.post('/deleteUser', function(req, res){

			console.log('req', req.body)
			if(req.isAuthenticated()){
				orm.deleteUser(req.body.userId, function(results){ 	
				});
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
				userData: results,
				nameuse: userLable
			})
		} else {
			res.redirect('/')
		}	
		});
	});

	// This will open the editing section for teachers to add homework
		app.get('/homework', function(req, res){

		orm.displayHomework(userMainid, function(resultsHomework){
		orm.displayEvents(userMainid, function(resultsEvents){	
		if (req.isAuthenticated()) {
			res.render('homework', {
				layout: 'user',
				username: req.user.username,
				isTeacher: req.user.isTeacher,
				email: req.user.email,
				// nameuse: userLable,
				homework: resultsHomework,
				events: resultsEvents,

			})

		} else {
			res.redirect('/')
		}
		});
		});	
	});	

		// Post homework to mysql
		app.post('/homework', function(req, res){

			if(req.isAuthenticated()){
			orm.homeworkPost(req.body.post, req.user.userId, req.user.classId);
		}
		else {

			res.redirect('/');
		}

	});

		// delete homework in mysql
		app.post('/deleteHomework', function(req, res){

			if(req.isAuthenticated()){
				orm.deleteHomework(req.body.hm_id, function(results){ 	
				});
			}	
		else {

			res.redirect('/');
		}
		
		});		

		// Post new event
		app.post('/newEvents', function(req, res){


			if(req.isAuthenticated()){
			orm.eventPost(req.body.post, req.user.userId, req.user.classId);
		}
		else {

			res.redirect('/');
		}

	});	
		// Delete an event
			app.post('/deleteEvent', function(req, res){

			if(req.isAuthenticated()){
				orm.deleteEvent(req.body.ev_id, function(results){ 	
				});
			}	
		else {

			res.redirect('/');
		}
		
		});	



}


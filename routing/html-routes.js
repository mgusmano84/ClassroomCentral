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
				otherAction: "Signup"
			});

	});

	app.get('/signin', function(req, res){
		res.redirect('/')
	});

	app.get('/signup', function(req, res){
		res.render('login', {
			layout: 'main',
			newPass: "Type a new User name and Password",
			actionPush: 'signup',
			otherAction: "Signin"
		});
	});	


	app.get('/userpage', function(req,res){
		if (req.isAuthenticated()) {
			res.render('userpage', {
				username: req.user.username,
				layout: 'main',
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

	app.post('/signup', function(req, res){
		var user = new UserAdd(req.body);
		UserAdd.saveUser(user, function(status){
			if(!status) {
				res.redirect('/signup')
				return false
			}
			res.redirect('/');
		});
	});	

}


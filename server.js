// Include Server Dependencies
var express = require('express');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var logger = require('morgan');
// var mongojs = require('mongojs');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// makes static content in assets accessible
app.use(express.static(process.cwd() + '/assets'));

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//session is used to keep the user logged in 
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}))

//flash is used to show a message on an incorrect login
app.use(flash());

//passport middleware methods
app.use(passport.initialize());
app.use(passport.session());

//setting up handlebars
var exphbs = require('express-handlebars');
var hbs = require('handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// -------------------------------------------------

// // MongoDB Configuration configuration
// var databaseUrl = 'Classroom';
// var collections = ["posts"];

// // use mongojs to hook the database to the db variable 
// var db = mongojs(databaseUrl, collections);

// db.on('error', function (err) {
//   console.log('MongoDB Error: ', err);
// });


// -------------------------------------------------




// //require routes
require('./routing/html-routes.js')(app);

// app.get('/', function(req, res){
//   res.sendFile('./assets/views/login.html' , { root : __dirname});
  
// })






// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongojs = require('mongojs');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// makes static content in assets accessible
app.use(express.static(process.cwd() + '/assets'));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
var databaseUrl = 'Classroom';
var collections = ["posts"];

// use mongojs to hook the database to the db variable 
var db = mongojs(databaseUrl, collections);

db.on('error', function (err) {
  console.log('MongoDB Error: ', err);
});


// -------------------------------------------------




// //require routes
// require('./routing/html-routes.js')(app);

app.get('/', function(req, res){
  res.sendFile('./assets/views/login.html' , { root : __dirname});
  
})




// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

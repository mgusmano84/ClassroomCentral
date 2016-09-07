var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.argv[2],
	database: 'ClassroomCentral'
});

function connectToDB(){
	connection.connect(function(err){
		if (err) {
			console.error('error connection:', err.stack);
			return
		}
		console.log('connected to MySQL')
	});
}

module.exports.connectToDB = connectToDB;

function addUserToDB(userObj, callback){

    if (userObj.isTeacher) {
        addNewClass(userObj, function(results, err){
            console.log('results are',results, err);
            userObj.classId = results.insertId;
            saveUserToDB(userObj);
        })
    } else {
        saveUserToDB(userObj)
    }

    function saveUserToDB(newUserObj){
        connection.query('INSERT INTO Users SET ?', newUserObj, function(err, results){
            if (err) {
                console.log(err) 
                return callback(false, err)
            }
            console.log('results are 1', results)
            callback(true, null)
        });
    }
}

function addNewClass(userObj, callback) {
    connection.query('INSERT INTO Class SET ?', {teacherName: userObj.username}, function(err, results){
        if (err) return callback(false, err);
        callback(results, null)
    });    
}

module.exports.addUserToDB = addUserToDB;

function findUser(username, callback){
	connection.query('SELECT * FROM Users WHERE ?', {username: username}, function(err, user){
		callback(err, user)
	})
}

module.exports.findUser = findUser;

// Add Post

function makePost(postMessage, userIn){
	postIt = [
		postMessage,
		userIn
	];
	connection.query('INSERT INTO Post (text, userId) VALUES (?, ?)', [postMessage ,userIn], function(err, results){
		if (err) throw err;
		console.log(results);
		});
		// console.log(query.sql)
}

module.exports.makePost = makePost;

function displayUsers(){
	connection.query('SELECT * FROM Users WHERE isTeacher = 0', function(err, results){
		if (err) throw err;
		console.log("orm check:" + results);
		});
		
}

module.exports.displayUsers = displayUsers;


var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'uoa25ublaow4obx5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	user: 'dfuzf8zr1cr8afi0',
	password: l4261v79jydufzrt,
	database: 'dqci7tkpo3j1ga42'
});


// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: process.argv[2],
// 	database: 'dqci7tkpo3j1ga42'
// });

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
	connection.query('INSERT INTO Post (text, userId) VALUES (?, ?)',postIt, function(err, results){
		if (err) throw err;
		console.log(results);
		});
		// console.log(query.sql)
}

module.exports.makePost = makePost;

function displayUsers(ClassID, callback){
	connection.query('SELECT * FROM Users WHERE isTeacher = 0 AND classId =?' , {ClassID: ClassID}, function(err, results){
		if (err) throw err;
		console.log("orm check:" + results);
		callback(results)
		});
		
}

module.exports.displayUsers = displayUsers;

function displayPost(ClassID){
	connection.query('SELECT * FROM Post WHERE classId =?' , {ClassID: ClassID}, function(err, results){
		if (err) throw err;
		console.log("orm check:" + results);
		});
		
}

module.exports.displayPost = displayPost;


function homeworkPost(homeworkPost, userIn){
	postIt = [
		homeworkPost,
		userIn
	];
	connection.query('INSERT INTO homework (text, userId) VALUES (?, ?)',postIt, function(err, results){
		if (err) throw err;
		console.log(results);
		});
		
}

module.exports.homeworkPost = homeworkPost;

function eventPost(eventPost, userIn){
	postIt = [
		eventPost,
		userIn
	];
	connection.query('INSERT INTO NewEvents (text, userId) VALUES (?, ?)',postIt, function(err, results){
		if (err) throw err;
		console.log(results);
		});
		
}

module.exports.eventPost = eventPost;
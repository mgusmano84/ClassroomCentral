var mysql = require('mysql');

var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: process.argv[2],
// 	database: 'ClassroomCentral'
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

function makePost(postMessage, userIn, classId, userName){
	postIt = [
		postMessage,
		userIn,
		classId,
		userName
	];
	connection.query('INSERT INTO Post (text, userId, classId, usernameP) VALUES (?, ?, ?, ?)',postIt, function(err, results){
		if (err) throw err;
		console.log(results);
		});
		// console.log(query.sql)
}

module.exports.makePost = makePost;

function deletePost(msgId, callback){
		connection.query('DELETE FROM Post WHERE msg_id = ? limit 1' , msgId, function(err, results){
		if (err) throw err;
		console.log(results);
		callback(results)
		});
}

module.exports.deletePost = deletePost;


function displayUsers(ClassID, callback){
	connection.query('SELECT * FROM Users WHERE isTeacher = 0 AND classId =?' , ClassID, function(err, results){
		if (err) throw err;
		console.log("orm check:" + results);
		callback(results)
		});
		
}

function deleteUser(userId, callback){
		connection.query('DELETE FROM Users WHERE userId = ? limit 1' , userId, function(err, results){
		if (err) throw err;
		console.log(results);
		callback(results)
		});
}

module.exports.deleteUser = deleteUser;



module.exports.displayUsers = displayUsers;

function displayPost(ClassID, callback){
	console.log("CLassid" + ClassID);
	connection.query('SELECT * FROM Post WHERE classId = ?' , ClassID, function(err, results){
		if (err) throw err;
		console.log("orm check:" + results);
		callback(results)
		});
		
}

module.exports.displayPost = displayPost;


function homeworkPost(homeworkPost, userIn, classId){
	postIt = [
		homeworkPost,
		userIn,
		classId
	];
	connection.query('INSERT INTO homework (text, userId, classId) VALUES (?, ?, ?)',postIt, function(err, results){
		if (err) throw err;
		console.log(results);
		});
		
}

module.exports.homeworkPost = homeworkPost;

function deleteHomework(hmId, callback){
		connection.query('DELETE FROM Homework WHERE hm_id = ?' , hmId, function(err, results){
		if (err) throw err;
		console.log(results);
		callback(results)
		});
}

module.exports.deleteHomework = deleteHomework;


function eventPost(eventPost, userIn, classId){
	postIt = [
		eventPost,
		userIn,
		classId
	];
	connection.query('INSERT INTO NewEvents (text, userId, ClassId) VALUES (?, ?, ?)',postIt, function(err, results){
		if (err) throw err;
		console.log(results);
		});
		
}

module.exports.eventPost = eventPost;

function deleteEvent(evId, callback){
		connection.query('DELETE FROM NewEvents WHERE ev_id = ?' , evId, function(err, results){
		if (err) throw err;
		console.log(results);
		callback(results)
		});
}

module.exports.deleteEvent = deleteEvent;


function displayHomework(ClassID, callback){
	connection.query('SELECT * FROM Homework WHERE classId = ?' , ClassID, function(err, results){
		if (err) throw err;
		console.log("orm check:" + results);
		callback(results)
		});
		
}

module.exports.displayHomework = displayHomework;

function displayEvents(ClassID, callback){
	connection.query('SELECT * FROM NewEvents WHERE classId = ?' , ClassID, function(err, results){
		if (err) throw err;
		console.log("orm check:" + results);
		callback(results)
		});
		
}

module.exports.displayEvents = displayEvents;

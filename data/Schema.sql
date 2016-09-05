create database ClassroomCentral;


use ClassroomCentral;

-- User Feature

-- create table if not exists Users(
--    userId integer primary key auto_increment,
--    username varchar(100) unique,
--    password varchar(100),
--    isTeacher BOOLEAN DEFAULT NULL,
--    classId int(11),
--    email varchar(100),	
--    FOREIGN KEY (classId) REFERENCES Class(classId)
--    );

create table if not exists Users(
   userId integer primary key auto_increment,
   username varchar(100) unique,
   password varchar(100),
   isTeacher BOOLEAN DEFAULT NULL,
   email varchar(100)	
)

--    create table Class (
-- 	classId integer primary key auto_increment
-- )

-- Message Feature

CREATE TABLE   Post (
	msg_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	text varchar(200) NOT NULL,
	userId int(11) NOT NULL,
	created int(11) DEFAULT NULL,
	-- classId int(11),
	-- FOREIGN KEY (classId) REFERENCES Class(classId),
	FOREIGN KEY (userId) REFERENCES Users(userId)
);

-- Comment Feature

CREATE TABLE Comments (
	text varchar(200) NOT NULL,
	post_id int(11) NOT NULL,
	created int(11) DEFAULT NULL,
	userId int(11) NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users(userId),
	FOREIGN KEY (post_id) REFERENCES Post(msg_id)
);














-- backup


drop database ClassroomCentral;


create database ClassroomCentral;


use ClassroomCentral;

create table if not exists Users(
   userId integer primary key auto_increment,
   username varchar(100) unique,
   password varchar(100),
   isTeacher BOOLEAN DEFAULT NULL,
   email varchar(100)	
)


CREATE TABLE   Post (
	msg_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	text varchar(200) NOT NULL,
	userId int(11) NOT NULL,
	created DATETIME DEFAULT NULL,
	FOREIGN KEY (userId) REFERENCES Users(userId)
);



CREATE TABLE Comments (
	text varchar(200) NOT NULL,
	post_id int(11) NOT NULL,
	created DATETIME DEFAULT NULL,
	userId int(11) NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users(userId),
	FOREIGN KEY (post_id) REFERENCES Post(msg_id)
);




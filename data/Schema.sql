
create database ClassroomCentral;

drop database ClassroomCentral;

use ClassroomCentral;




create table if not exists Users(
   userId integer primary key auto_increment,
   username varchar(100) unique,
   password varchar(100),
   isTeacher BOOLEAN DEFAULT NULL,
   email varchar(100),
   classId integer
);



CREATE TABLE   Post (
    msg_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    text varchar(200) NOT NULL,
    userId int(11) NOT NULL,
    created DATETIME DEFAULT NULL,
    classId integer,
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

CREATE TABLE Homework (
  hm_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  text varchar(200) NOT NULL,
    userId int(11) NOT NULL,
    classId integer,
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

CREATE TABLE NewEvents (
  ev_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  text varchar(200) NOT NULL,
    userId int(11) NOT NULL,
    classId integer,
    FOREIGN KEY (userId) REFERENCES Users(userId)
);
    

CREATE TABLE   Class (
    teacherName varchar(200) NOT NULL,
    classId integer primary key auto_increment
);


CREATE TABLE Comments (
    text varchar(200) NOT NULL,
    post_id int(11) NOT NULL,
    created DATETIME DEFAULT NULL,
    userId int(11) NOT NULL,
    classId integer,
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (post_id) REFERENCES Post(msg_id)
);



























-- create database ClassroomCentral;

-- drop database ClassroomCentral;

-- use ClassroomCentral;




-- create table if not exists Users(
--    userId integer primary key auto_increment,
--    username varchar(100) unique,
--    password varchar(100),
--    isTeacher BOOLEAN DEFAULT NULL,
--    email varchar(100),
--    classId integer
-- );


-- CREATE TABLE   Post (
--     msg_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     text varchar(200) NOT NULL,
--     userId int(11) NOT NULL,
--     created DATETIME DEFAULT NULL,
--     FOREIGN KEY (userId) REFERENCES Users(userId)
-- );

-- CREATE TABLE Homework (
--   hm_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   text varchar(200) NOT NULL,
--     userId int(11) NOT NULL,
--     FOREIGN KEY (userId) REFERENCES Users(userId)
-- );

-- CREATE TABLE NewEvents (
--   ev_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   text varchar(200) NOT NULL,
--     userId int(11) NOT NULL,
--     FOREIGN KEY (userId) REFERENCES Users(userId)
-- );
    

-- CREATE TABLE   Class (
--     teacherName varchar(200) NOT NULL,
--     classId integer primary key auto_increment
-- );


-- CREATE TABLE Comments (
--     text varchar(200) NOT NULL,
--     post_id int(11) NOT NULL,
--     created DATETIME DEFAULT NULL,
--     userId int(11) NOT NULL,
--     FOREIGN KEY (userId) REFERENCES Users(userId),
--     FOREIGN KEY (post_id) REFERENCES Post(msg_id)
-- );
























-- create database ClassroomCentral;

-- use ClassroomCentral;


-- create table if not exists Users(
--    userId integer primary key auto_increment,
--    username varchar(100) unique,
--    password varchar(100),
--    isTeacher BOOLEAN DEFAULT NULL,
--    email varchar(100),
--    classId integer
-- );


-- CREATE TABLE   Post (
--     msg_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     text varchar(200) NOT NULL,
--     userId int(11) NOT NULL,
--     created DATETIME DEFAULT NULL,
--     FOREIGN KEY (userId) REFERENCES Users(userId)
-- );

-- CREATE TABLE   Class (
--     teacherName varchar(200) NOT NULL,
--     classId integer primary key auto_increment
-- );


-- CREATE TABLE Comments (
--     text varchar(200) NOT NULL,
--     post_id int(11) NOT NULL,
--     created DATETIME DEFAULT NULL,
--     userId int(11) NOT NULL,
--     FOREIGN KEY (userId) REFERENCES Users(userId),
--     FOREIGN KEY (post_id) REFERENCES Post(msg_id)
-- );













-- backup

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



















-- create database ClassroomCentral;


-- use ClassroomCentral;



-- create table if not exists Users(
--    userId integer primary key auto_increment,
--    username varchar(100) unique,
--    password varchar(100),
--    isTeacher BOOLEAN DEFAULT NULL,
--    email varchar(100)	
-- )

-- --    create table Class (
-- -- 	classId integer primary key auto_increment
-- -- )

-- -- Message Feature

-- CREATE TABLE   Post (
-- 	msg_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
-- 	text varchar(200) NOT NULL,
-- 	userId int(11) NOT NULL,
-- 	created int(11) DEFAULT NULL,
-- 	-- classId int(11),
-- 	-- FOREIGN KEY (classId) REFERENCES Class(classId),
-- 	FOREIGN KEY (userId) REFERENCES Users(userId)
-- );

-- -- Comment Feature

-- CREATE TABLE Comments (
-- 	text varchar(200) NOT NULL,
-- 	post_id int(11) NOT NULL,
-- 	created int(11) DEFAULT NULL,
-- 	userId int(11) NOT NULL,
-- 	FOREIGN KEY (userId) REFERENCES Users(userId),
-- 	FOREIGN KEY (post_id) REFERENCES Post(msg_id)
-- );

















-- Save for later ********************


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




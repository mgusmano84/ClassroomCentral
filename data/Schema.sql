create database ClassroomCentral;


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
    usernameP varchar(100) NOT NULL,
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








-- Add On

-- CREATE TABLE Comments (
--     text varchar(200) NOT NULL,
--     post_id int(11) NOT NULL,
--     created DATETIME DEFAULT NULL,
--     userId int(11) NOT NULL,
--     classId integer,
--     usernameM varchar(100) NOT NULL,
--     FOREIGN KEY (userId) REFERENCES Users(userId),
--     FOREIGN KEY (post_id) REFERENCES Post(msg_id)
-- );


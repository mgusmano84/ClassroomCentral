create database ClassroomCentral;


use ClassroomCentral;

create table if not exists Users(
   userId integer primary key auto_increment,
   username varchar(100) unique,
   password varchar(100)
)


-- Message Feature

CREATE TABLE   Messages (
`msg_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
`message` varchar(200) NOT NULL,
`user_id` int(11) NOT NULL,
`likes` int(11) DEFAULT NULL,
`created` int(11) DEFAULT NULL,
FOREIGN KEY (user_id) REFERENCES Users(userId)
);
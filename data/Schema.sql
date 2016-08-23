create database ClassroomCentral;


use ClassroomCentral;

create table if not exists Users(
   userId integer primary key auto_increment,
   username varchar(100) unique,
   password varchar(100)
)
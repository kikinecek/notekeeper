CREATE DATABASE notekeeper;

USE notekeeper;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(40) NOT NULL,
  first_name VARCHAR(20) NULL,
  last_name VARCHAR(20) NULL,
  created_at TIMESTAMP DEFAULT UTC_TIMESTAMP(),
  PRIMARY KEY (id),
  UNIQUE KEY (email)
);

CREATE TABLE password (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  salt VARCHAR(256),
  pwd VARCHAR(256),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user (id)
);
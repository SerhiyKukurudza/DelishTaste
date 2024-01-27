drop database if exists delish_taste;
create database if not exists delish_taste;
use delish_taste;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE recipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    preparation TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    time INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    difficulty VARCHAR(20) NOT NULL
);
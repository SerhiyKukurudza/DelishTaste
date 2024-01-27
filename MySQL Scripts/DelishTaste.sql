drop database if exists delish_taste;
create database if not exists delish_taste;
use delish_taste;

CREATE TABLE role (
    idRole INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(100) NOT NULL
);

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role INT NOT NULL,
  FOREIGN KEY (role)
        REFERENCES role (idRole)
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
  

INSERT INTO role (role) VALUES
('Admin'),
('User');

-- Portuguese Cuisine Recipes
INSERT INTO recipe (title, author, ingredients, preparation, category, time, price, difficulty)
VALUES
    ('Bacalhau à Brás', 'Chef Maria', 'Salted cod, onions, potatoes, eggs, olive oil', 'Soak the cod overnight. Shred the cod. Sauté onions and potatoes. Add cod and eggs. Cook until eggs are set.', 'Portuguese', 60, 25.99, 'Medium');


INSERT INTO user (name, email, password, role) VALUES
('Serhiy Kukurudza', 'sergiykukurudza@gmail.com', '$2a$08$1.O8FKPKREkIjcZ23F3VZuspBo8UkR52Ksy41ddnaCAN57Z.btMBK', 1),
('Bruno Rosa', 'bruno@gmail.com', '$2a$08$1.O8FKPKREkIjcZ23F3VZuspBo8UkR52Ksy41ddnaCAN57Z.btMBK', 1),
('Normal User', 'user@gmail.com', '$2a$08$1.O8FKPKREkIjcZ23F3VZuspBo8UkR52Ksy41ddnaCAN57Z.btMBK', 2);


select * from user;

select * from role;

SELECT user.id, user.name, user.email, user.password, role.role as role
FROM user
JOIN role ON user.role = role.idRole;


    
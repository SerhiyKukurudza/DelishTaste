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
    difficulty VARCHAR(20) NOT NULL,
	image varchar(255)
);
  

INSERT INTO role (role) VALUES
('Admin'),
('User');


INSERT INTO user (name, email, password, role) VALUES
('Serhiy Kukurudza', 'sergiykukurudza@gmail.com', '$2a$08$1.O8FKPKREkIjcZ23F3VZuspBo8UkR52Ksy41ddnaCAN57Z.btMBK', 1),
('Bruno Rosa', 'bruno@gmail.com', '$2a$08$1.O8FKPKREkIjcZ23F3VZuspBo8UkR52Ksy41ddnaCAN57Z.btMBK', 1),
('Normal User', 'user@gmail.com', '$2a$08$1.O8FKPKREkIjcZ23F3VZuspBo8UkR52Ksy41ddnaCAN57Z.btMBK', 2);
-- Portuguese Cuisine Recipes
INSERT INTO recipe (title, author, ingredients, preparation, category, time, price, difficulty, image)
VALUES
    ('Bacalhau à Brás', 'Chef Maria', 'Salted cod, onions, potatoes, eggs, olive oil', '1. Soak the cod overnight. 2. Shred the cod. 3. Sauté onions and potatoes. 4. Add cod and eggs. 5. Cook until eggs are set.', 'Portuguese', 60, 25.99, 'Medium', '/images/dishes/cod.jpg'),
    ('Caldo Verde', 'Chef João', 'Potatoes, chorizo, kale, onions, garlic', '1. Boil potatoes until tender. 2. Sauté onions and garlic. 3. Add chorizo and kale. 4. Simmer until kale is tender.', 'Portuguese', 45, 12.50, 'Easy', '/images/dishes/caldoVerde.jpg');

-- Portuguese Cuisine Recipes (continued)
INSERT INTO recipe (title, author, ingredients, preparation, category, time, price, difficulty, image)
VALUES
    ('Pastel de Nata', 'Chef Luisa', 'Puff pastry, egg custard, cinnamon, sugar', '1. Roll out puff pastry. 2. Fill with egg custard. 3. Bake until golden. 4. Sprinkle with cinnamon and sugar.', 'Portuguese', 45, 15.99, 'Intermediate', '/images/dishes/pastelNata.jpg');

INSERT INTO recipe (title, author, ingredients, preparation, category, time, price, difficulty, image)
VALUES
    ('Pastel de Leitão', 'Chef Manuel', 'Suckling pig, garlic, bay leaves, white wine', '1. Marinate suckling pig with garlic and bay leaves. 2. Roast until crispy. 3. Serve with a white wine reduction.', 'Portuguese', 120, 65.00, 'Advanced', '/images/dishes/pastelLeitao.jpg');

INSERT INTO recipe (title, author, ingredients, preparation, category, time, price, difficulty, image)
VALUES
    ('Francesinha', 'Chef Carlos', 'Sausage, ham, steak, linguiça, bread, beer sauce', '1. Layer sausage, ham, steak, and linguiça between bread slices. 2. Bake until cheese melts. 3. Pour beer sauce over the top.', 'Portuguese', 60, 20.50, 'Intermediate', '/images/dishes/francesinha.jpg');

-- French Cuisine Recipe
INSERT INTO recipe (title, author, ingredients, preparation, category, time, price, difficulty, image)
VALUES
    ('Coq au Vin', 'Chef Pierre', 'Chicken, red wine, mushrooms, onions, bacon', '1. Marinate chicken in red wine. 2. Sauté onions, mushrooms, and bacon. 3. Brown chicken. 4. Simmer until chicken is cooked.', 'French', 90, 35.99, 'Intermediate', '/images/dishes/coqAuVin.jpg');

-- Italian Cuisine Recipe
INSERT INTO recipe (title, author, ingredients, preparation, category, time, price, difficulty, image)
VALUES
    ('Spaghetti Bolognese', 'Chef Giuseppe', 'Ground beef, tomatoes, onions, garlic, spaghetti', '1. Sauté onions and garlic. 2. Brown ground beef. 3. Add tomatoes. 4. Simmer and serve over cooked spaghetti.', 'Italian', 60, 18.75, 'Easy', '/images/dishes/spaghetti.jpg');

-- Mexican Cuisine Recipe
INSERT INTO recipe (title, author, ingredients, preparation, category, time, price, difficulty, image)
VALUES
    ('Tacos al Pastor', 'Chef Rosa', 'Pork, pineapple, onions, cilantro, tortillas', '1. Marinate pork in adobo. 2. Grill with pineapple. 3. Dice and serve in tortillas with onions and cilantro.', 'Mexican', 45, 22.50, 'Easy', '/images/dishes/tacos.jpg');

-- Greek Cuisine Recipe
INSERT INTO recipe (title, author, ingredients, preparation, category, time, price, difficulty, image)
VALUES
    ('Moussaka', 'Chef Nikos', 'Eggplant, ground lamb, tomatoes, bechamel sauce', '1. Layer eggplant and lamb. 2. Add tomatoes. 3. Top with bechamel. 4. Bake until golden brown.', 'Greek', 75, 28.50, 'Intermediate', '/images/dishes/moussaka.jpg');

-- Japanese Cuisine Recipe
INSERT INTO recipe (title, author, ingredients, preparation, category, time, price, difficulty, image)
VALUES
    ('Sushi Rolls', 'Chef Hiroshi', 'Rice, nori, fish, avocado, cucumber', '1. Prepare sushi rice. 2. Lay out nori. 3. Add fish, avocado, and cucumber. 4. Roll and slice into bite-sized pieces.', 'Japanese', 30, 40.00, 'Advanced', '/images/dishes/sushi.jpg');



select * from user;

select * from role;

SELECT user.id, user.name, user.email, user.password, role.role as role
FROM user
JOIN role ON user.role = role.idRole;

select * from recipe;
    
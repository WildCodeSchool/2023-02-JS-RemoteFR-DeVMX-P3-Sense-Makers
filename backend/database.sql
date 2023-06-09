-- Active: 1682397207093@@127.0.0.1@3306@makesense

CREATE TABLE roles (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  role_name VARCHAR(254) NOT NULL
);

CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  photo VARCHAR(254),
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(254) NOT NULL,
  job_title VARCHAR(254),
  department VARCHAR(254),
  creation_date DATE
);
CREATE TABLE users_roles (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT,
  role_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  FOREIGN KEY (user_id)
  REFERENCES users(id)
);

CREATE TABLE experts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  area_of_expertise VARCHAR(254) NOT NULL
);

CREATE TABLE experts_users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  expert_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (expert_id)
  REFERENCES experts(id),
  FOREIGN KEY (user_id)
  REFERENCES users(id)
);

CREATE TABLE `status` (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL
);

CREATE TABLE decisions (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(254) NOT NULL,
  content VARCHAR(3000) NOT NULL,
  usefulness VARCHAR(254) NOT NULL,
  context VARCHAR(254) NOT NULL,
  benefit VARCHAR(254) NOT NULL,
  disavantages VARCHAR(254) NOT NULL,
  positives_votes INT,
  negatives_votes INT,
  status_id INT NOT NULL,
  FOREIGN KEY (status_id)
  REFERENCES `status`(id)
);

CREATE TABLE status_date (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  decision_id INT NOT NULL,
  status_id INT NOT NULL,
  FOREIGN KEY (decision_id)
  REFERENCES decisions(id),
  FOREIGN KEY (status_id)
  REFERENCES `status`(id)
);

CREATE TABLE categories (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(254) NOT NULL
);

CREATE TABLE decisions_categories (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  decision_id INT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (decision_id)
  REFERENCES decisions(id),
  FOREIGN KEY (category_id)
  REFERENCES categories(id)
);

CREATE TABLE users_decisions (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  decision_id INT NOT NULL,
    FOREIGN KEY (user_id)
  REFERENCES users(id),
    FOREIGN KEY (decision_id)
  REFERENCES decisions(id)
);
CREATE TABLE tagged_as_experts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
  decision_id INT NOT NULL,
    FOREIGN KEY (user_id)
  REFERENCES users(id),
    FOREIGN KEY (decision_id)
  REFERENCES decisions(id)
);
CREATE TABLE tagged_as_impacted (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
  decision_id INT NOT NULL,
    FOREIGN KEY (user_id)
  REFERENCES users(id),
    FOREIGN KEY (decision_id)
  REFERENCES decisions(id)
);
CREATE TABLE comments (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
  decision_id INT NOT NULL,
  creation_date DATE NOT NULL,
    FOREIGN KEY (user_id)
  REFERENCES users(id),
    FOREIGN KEY (decision_id)
  REFERENCES decisions(id),
  `comment` VARCHAR(3000),
  vote TINYINT
);

INSERT INTO roles (role_name) VALUES
("administrator"),
("employee"),
("volunteer"),
("decision maker");

INSERT INTO `status` (title) VALUES
("created"),
("opinion deadline"),
("decision taken"),
("conflict deadline"),
("final decison");

INSERT INTO users (firstname, lastname, email, password, creation_date) VALUES (
  "place", "holder", "place.holder@test.com", "99922242", "2023-03-03"
);

INSERT INTO users_roles (user_id, role_id) VALUES (
1, 1
);

INSERT INTO decisions ( title, content, usefulness,context,benefit,disavantages,positives_votes,negatives_votes,status_id) VALUES ("Test","On test","pourris","on test toujours","Aucun","Enormement",0,0,1);


INSERT INTO comments (user_id, decision_id,creation_date, comment) VALUES (1,2,"2023-06-08","blablalballblalb");

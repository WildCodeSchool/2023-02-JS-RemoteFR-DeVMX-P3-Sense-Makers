
CREATE TABLE adress (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  city VARCHAR(254),
  street_number INT,
  street_name VARCHAR(254)
);
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
  password VARCHAR(500) NOT NULL UNIQUE,
  phone_number VARCHAR(100),
  decision_maker TINYINT,
  job_title VARCHAR(254),
  role_id INT NOT NULL,
  adress_id INT NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  FOREIGN KEY (adress_id)
  REFERENCES adress(id)
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
    FOREIGN KEY (user_id)
  REFERENCES users(id),
    FOREIGN KEY (decision_id)
  REFERENCES decisions(id),
  `comment` VARCHAR(3000),
  vote TINYINT
);
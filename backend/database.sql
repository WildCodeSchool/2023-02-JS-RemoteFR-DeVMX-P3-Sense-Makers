-- Active: 1682342351805@@127.0.0.1@3306@make_sense
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
  role_id INT NOT NULL,
  creation_date DATE,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
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
("employee");

INSERT INTO `status` (title) VALUES
("created"),
("opinion deadline"),
("decision taken"),
("conflict deadline"),
("final decison");

INSERT INTO users (firstname, lastname, email, password, role_id, creation_date) VALUES
("place", "holder", "place.holder@test.com", "99922242", 1, "2023-03-03"),
("Jean", "Neymar", "jean.neymar@menfou.com", "iiiiiii", 2, "2025-12-08"),
("mich", "mich", "michmich@mich.com", "michmich", 2, "1905-05-25"),
("gterzuib", "ergtziàj", "ureigsgpf@gtr.com", "igurezh", 2, "8674-02-05");

INSERT INTO decisions ( title, content, usefulness, context, benefit, disavantages, positives_votes, negatives_votes, status_id) VALUES
("Test", "On test", "pourris", "on test toujours", "Aucun", "Enormement", 0, 0, 1),
("c'est un titre", "c'est un contenu placeholder copain on s'en tamponne bien cordialement de ce que t'écris. compris?", "c'est un placeholder pour l'utilité... oui c'est utile, tais-toi et code", "context du placeholder? placeholder", "les bénéfice d'un placeholder? bah c'est qu'on peu tester des trucs sur des trucs sans avoir de vrai trucs. du coup c'est cooool", "les désavantages? je me fais chier a écrire des trucs que tu va pas lire", 0, 1337, 1),
("le chat", "manger le chat", "manger", "faim", "manger = plus faim", "a plus de chat", 42, 12, 5),
("placeholder", "je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder", "il faut placer holder", "placer holder", "holder sera enfin placé", "c'est long de placer holder", 42, 42, 2);

INSERT INTO comments (user_id, decision_id,creation_date, comment) VALUES
(1, 2, "2023-06-08", "blablalballblalb"),
(1, 3, "2023-06-09", "miam"),
(1, 4, "2023-06-11", "placer"),
(2, 1, "2023-06-12", "test?"),
(2, 3, "2023-06-12", "miaou"),
(3, 2, "2023-06-15", "m'en fou, pas lu"),
(4, 2, "2023-06-16", "pas lu, m'en fou"),
(4, 4, "2023-06-17", "holder");

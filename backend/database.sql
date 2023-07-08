-- Active: 1682342265558@@127.0.0.1@3306@makesense
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
  is_active TINYINT DEFAULT 1,
  password VARCHAR(254) NOT NULL,
  creation_date DATE DEFAULT (CURRENT_DATE) 
);
CREATE TABLE users_roles (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  user_id INT,
  role_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
CREATE TABLE `status` (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL
);
CREATE TABLE concernedhub (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL
);
CREATE TABLE decisions (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(254) NOT NULL,
  content TEXT NOT NULL,
  usefulness TEXT NOT NULL,
  context TEXT NOT NULL,
  benefit TEXT NOT NULL,
  disadvantages TEXT NOT NULL,
  first_decision_content TEXT,
  concerned_hub_id INT NOT NULL,
  initial_date DATE DEFAULT (CURRENT_DATE) NOT NULL,
  deadline_comment DATE,
  first_take_decision DATE,
  deadline_conflict DATE,
  final_take_decision DATE,
  positives_votes INT,
  negatives_votes INT,
  is_validated TINYINT,
  status_id INT NOT NULL,
  FOREIGN KEY (status_id) REFERENCES `status`(id)
);
CREATE TABLE users_decisions (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  decision_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (decision_id) REFERENCES decisions(id)
);
CREATE TABLE tagged_as_experts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  decision_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (decision_id) REFERENCES decisions(id)
);
CREATE TABLE tagged_as_impacted (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  decision_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (decision_id) REFERENCES decisions(id)
);
CREATE TABLE comments (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  decision_id INT NOT NULL,
  creation_date DATE DEFAULT (CURRENT_DATE) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (decision_id) REFERENCES decisions(id),
  `comment` TEXT NOT NULL,
  vote TINYINT
);
INSERT INTO roles (role_name)
VALUES ("Administrateur"),
  ("Salarié"),
  ("Expert");
INSERT INTO `status` (title)
VALUES ("Prise de décision débutée"),
  ("Prise de décision en attente"),
  ("Première décision prise"),
  ("Décision définitive en attente"),
  ("Décision définitive"),
  ("Décision terminée"),
  ("Décision non aboutie");

INSERT INTO users (
    firstname,
    lastname,
    photo,
    email,
    password,
    is_active,
    creation_date
  )
VALUES (
    "Place",
    "holder",
    "Alaric.jpg",
    "place.holder@placeholder.com",
    "$argon2id$v=19$m=65536,t=3,p=4$G86ilaHqcIdB1K7i9aW7qw$MY6SjY1R4irmD8qIJCIAZ+R65DslW1Pdb6l7X/FYAxM",
    1,
    "2023-03-03"
  ),
  (
    "Jean",
    "Michel",
    "Nicolas.jpg",
    "jean.mich@michel.com",
    "$argon2id$v=19$m=65536,t=3,p=4$G86ilaHqcIdB1K7i9aW7qw$MY6SjY1R4irmD8qIJCIAZ+R65DslW1Pdb6l7X/FYAxM",
    1,
    "2025-12-08"
  ),
  (
    "Harry",
    "Potter",
    "photo-frederico_cassola_.jpg",
    "Harry.Potter@poudlard.com",
    "$argon2id$v=19$m=65536,t=3,p=4$G86ilaHqcIdB1K7i9aW7qw$MY6SjY1R4irmD8qIJCIAZ+R65DslW1Pdb6l7X/FYAxM",
    1,
    "1905-05-25"
  ),
  (
    "Lore",
    "M",
    "Photo_Charlotte.jpg",
    "lorem@ipsum.com",
    "$argon2id$v=19$m=65536,t=3,p=4$G86ilaHqcIdB1K7i9aW7qw$MY6SjY1R4irmD8qIJCIAZ+R65DslW1Pdb6l7X/FYAxM",
    1,
    "8674-02-05"
  );
INSERT INTO decisions (
    title,
    content,
    usefulness,
    context,
    benefit,
    disadvantages,
    concerned_hub_id,
    initial_date,
    deadline_comment,
    first_take_decision,
    deadline_conflict,
    final_take_decision,
    positives_votes,
    negatives_votes,
    is_validated,
    status_id
  )
VALUES (
    "Test",
    " test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
    "Il faut bien TESTER",
    "on TEST",
    " test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
    " tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset tset",
    1,
    "2023-05-01",
    "2023-05-16",
    "2023-05-23",
    "2023-06-07",
    "2023-06-22",
    0,
    0,
    1,
    6
  ),
  (
    "Wingardium leviosaAaAaaAAaa",
    "Aberto Accio Aguamenti Alohomora Amplificatum Anapneo Aparecium Appare vestigium Arania exumai Arresto momentum Ascendio Assurdiato Avada Kedavra Avensegium Avis Bloclang Bombarda Brachialigo Brachium emendo Cave inimicum Circumrota Capacious extremis Cistem aperio Collaporta Confringo Confundo Defodio Deprimo Dentesaugmento Sortilège de Désillusion Destructum Diffindo Dissendium Duro Emancipare Endoloris Enervatum Episkey Erigo Evanesco Everte statum Expecto Patronum Expelliarmus Expulso Fenestra Failamalle Ferula Feudeymon Fianto Duri Finite Finite Incantatem Flambios Fulgari Furunculus Gemino Glisseo Harmonia nectere passus Hominum revelio Homomorphus Impedimenta Impero Immobulus Incarcerem Incendio Lacarnum inflammari Lashlabask Legilimens Levicorpus Liberacorpus Locomotor Barda Locomotor Mortis Locomotor Wibbly Lumos Meteorribilis Recanto Mobiliarbus Mobilicorpus Molliare Morsmordre Mutinlutin Malinpesti Nebulus Nox  Obscuro Oppugno Orchideus Oscausi Oubliettes Partis Temporus Periculum Petrificus Totalus Piertotum Locomotor Portus Prior Incanto Priori Incantatum Protego Protego Diabolica Protego Totalum Protego Horribilis Protego Maxima Recurvite Reducto Reparo Repello Moldum Repello Inimicium Reverte Revigor Revelio Rictusempra Riddikulus Salveo Maleficia Sectumsempra Serpensortia Silencio Sonorus Surdinam Surgito Specialis Revelio Spero Patronum Stupefix Tarentallegra Tergeo Têtenbulle Ventus Vera Verto Vipera Evanesca Volate Ascendere Vulnera Sanentur Waddiwasi Wingardium leviosa",
    "Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa",
    "Placeholder leviosa",
    "Wingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosaWingardium leviosa",
    "Stupefix Stupefix Stupefix Stupefix Stupefix Stupefix Stupefix Stupefix Stupefix Stupefix Stupefix Stupefix Stupefix Stupefix",
    1,
    "2023-06-04",
    "2023-06-19",
    "2023-06-26",
    "2023-07-11",
    "2023-07-26",
    0,
    1337,
    NULL,
    3
  ),
  (
    "Lorem Ipsum",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Mattis enim ut tellus elementum sagittis. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Malesuada pellentesque elit eget gravida cum. Nunc sed augue lacus viverra vitae. Id interdum velit laoreet id donec. Purus semper eget duis at tellus. Aliquet eget sit amet tellus cras adipiscing enim. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Etiam erat velit scelerisque in dictum non consectetur a. Diam quam nulla porttitor massa id neque. Et egestas quis ipsum suspendisse. Neque volutpat ac tincidunt vitae. Porttitor eget dolor morbi non arcu risus quis varius. Quis lectus nulla at volutpat diam ut venenatis tellus.
Leo in vitae turpis massa. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Imperdiet proin fermentum leo vel orci porta non pulvinar. Rutrum tellus pellentesque eu tincidunt tortor. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Cum sociis natoque penatibus et magnis. Suspendisse interdum consectetur libero id faucibus. Sit amet justo donec enim diam vulputate ut. Malesuada fames ac turpis egestas. Mattis nunc sed blandit libero volutpat. Eget arcu dictum varius duis. Turpis egestas sed tempus urna et. Fermentum odio eu feugiat pretium nibh ipsum. Ac placerat vestibulum lectus mauris ultrices eros.
Non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Quam vulputate dignissim suspendisse in est ante. Velit scelerisque in dictum non consectetur a erat nam at. Tellus pellentesque eu tincidunt tortor aliquam nulla. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Sed turpis tincidunt id aliquet risus feugiat in ante. Purus gravida quis blandit turpis. Tincidunt vitae semper quis lectus nulla at volutpat diam. Tristique et egestas quis ipsum suspendisse ultrices gravida. Placerat duis ultricies lacus sed. Purus in massa tempor nec feugiat nisl pretium fusce. Tristique magna sit amet purus gravida. Turpis egestas pretium aenean pharetra magna. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper.
Nibh cras pulvinar mattis nunc. Sed risus ultricies tristique nulla aliquet enim tortor at. Elementum sagittis vitae et leo duis ut diam quam. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Massa massa ultricies mi quis hendrerit dolor magna eget. Natoque penatibus et magnis dis parturient. Duis at consectetur lorem donec massa sapien faucibus et. Vel pharetra vel turpis nunc eget lorem dolor sed. Commodo ullamcorper a lacus vestibulum sed. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Amet justo donec enim diam vulputate ut. Leo vel orci porta non pulvinar. Enim facilisis gravida neque convallis a cras semper auctor. Vitae suscipit tellus mauris a. Velit scelerisque in dictum non consectetur a. Et ultrices neque ornare aenean euismod elementum nisi quis. Scelerisque mauris pellentesque pulvinar pellentesque. Fermentum posuere urna nec tincidunt praesent semper feugiat. Tortor condimentum lacinia quis vel eros donec ac odio. Libero id faucibus nisl tincidunt eget nullam non nisi est.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Mattis enim ut tellus elementum sagittis. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Malesuada pellentesque elit eget gravida cum. Nunc sed augue lacus viverra vitae. Id interdum velit laoreet id donec. Purus semper eget duis at tellus. Aliquet eget sit amet tellus cras adipiscing enim. Elit ullamcorper dignissim cras tincidunt lobortis feugiat.",
    "Lorem ipsum dolor sit amet",
    "Leo in vitae turpis massa. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Imperdiet proin fermentum leo vel orci porta non pulvinar. Rutrum tellus pellentesque eu tincidunt tortor. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Cum sociis natoque penatibus et magnis. Suspendisse interdum consectetur libero id faucibus. Sit amet justo donec enim diam vulputate ut. Malesuada fames ac turpis egestas. Mattis nunc sed blandit libero volutpat. Eget arcu dictum varius duis. Turpis egestas sed tempus urna et. Fermentum odio eu feugiat pretium nibh ipsum. Ac placerat vestibulum lectus mauris ultrices eros.",
    "Placerat duis ultricies lacus sed. Purus in massa tempor nec feugiat nisl pretium fusce. Tristique magna sit amet purus gravida. Turpis egestas pretium aenean pharetra magna. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper.
Nibh cras pulvinar mattis nunc. Sed risus ultricies tristique nulla aliquet enim tortor at. Elementum sagittis vitae et leo duis ut diam quam. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis.",
    1,
    "2023-06-08",
    "2023-06-23",
    "2023-06-30",
    "2023-07-15",
    "2023-07-30",
    42,
    12,
    NULL,
    2
  ),
  (
    "placeholder",
    "je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder",
    "il faut placer holder parce qu'on a toujours besoin d'un petit placeholder quelque part",
    "placer holder dans le cadre d'un plaçage de holder",
    "holder sera enfin placé, et je pense que notre entreprise a vraiment besoin d'un holder placé a l'heure actuel car dans le context économique actuel nous ne pouvons pas nous permettre d'avoir un contenu n'étant pas du placeholder",
    "c'est très long de placer holder et placeholder ne restera pas du coup c'est d'autant plus de temps de perdu",
    1,
    "2023-06-25",
    "2023-07-10",
    "2023-07-17",
    "2023-08-01",
    "2023-08-16",
    42,
    42,
    NULL,
    1
  ),
  (
    "placeholder",
    "je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder, je place holder; tu places holder; il place holder; nous plaçons holder; vous placez holder; ils placent holder",
    "il faut placer holder parce qu'on a toujours besoin d'un petit placeholder quelque part",
    "placer holder dans le cadre d'un plaçage de holder",
    "holder sera enfin placé, et je pense que notre entreprise a vraiment besoin d'un holder placé a l'heure actuel car dans le context économique actuel nous ne pouvons pas nous permettre d'avoir un contenu n'étant pas du placeholder",
    "c'est très long de placer holder et placeholder ne restera pas du coup c'est d'autant plus de temps de perdu",
    1,
    "2023-06-21",
    "2023-07-06",
    "2023-07-13",
    "2023-07-28",
    "2023-08-12",
    42,
    42,
    NULL,
    1
  ),
  
  (
    "Lorem Ipsum",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Mattis enim ut tellus elementum sagittis. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Malesuada pellentesque elit eget gravida cum. Nunc sed augue lacus viverra vitae. Id interdum velit laoreet id donec. Purus semper eget duis at tellus. Aliquet eget sit amet tellus cras adipiscing enim. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Etiam erat velit scelerisque in dictum non consectetur a. Diam quam nulla porttitor massa id neque. Et egestas quis ipsum suspendisse. Neque volutpat ac tincidunt vitae. Porttitor eget dolor morbi non arcu risus quis varius. Quis lectus nulla at volutpat diam ut venenatis tellus.
Leo in vitae turpis massa. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Imperdiet proin fermentum leo vel orci porta non pulvinar. Rutrum tellus pellentesque eu tincidunt tortor. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Cum sociis natoque penatibus et magnis. Suspendisse interdum consectetur libero id faucibus. Sit amet justo donec enim diam vulputate ut. Malesuada fames ac turpis egestas. Mattis nunc sed blandit libero volutpat. Eget arcu dictum varius duis. Turpis egestas sed tempus urna et. Fermentum odio eu feugiat pretium nibh ipsum. Ac placerat vestibulum lectus mauris ultrices eros.
Non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Quam vulputate dignissim suspendisse in est ante. Velit scelerisque in dictum non consectetur a erat nam at. Tellus pellentesque eu tincidunt tortor aliquam nulla. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Sed turpis tincidunt id aliquet risus feugiat in ante. Purus gravida quis blandit turpis. Tincidunt vitae semper quis lectus nulla at volutpat diam. Tristique et egestas quis ipsum suspendisse ultrices gravida. Placerat duis ultricies lacus sed. Purus in massa tempor nec feugiat nisl pretium fusce. Tristique magna sit amet purus gravida. Turpis egestas pretium aenean pharetra magna. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper.
Nibh cras pulvinar mattis nunc. Sed risus ultricies tristique nulla aliquet enim tortor at. Elementum sagittis vitae et leo duis ut diam quam. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Massa massa ultricies mi quis hendrerit dolor magna eget. Natoque penatibus et magnis dis parturient. Duis at consectetur lorem donec massa sapien faucibus et. Vel pharetra vel turpis nunc eget lorem dolor sed. Commodo ullamcorper a lacus vestibulum sed. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Amet justo donec enim diam vulputate ut. Leo vel orci porta non pulvinar. Enim facilisis gravida neque convallis a cras semper auctor. Vitae suscipit tellus mauris a. Velit scelerisque in dictum non consectetur a. Et ultrices neque ornare aenean euismod elementum nisi quis. Scelerisque mauris pellentesque pulvinar pellentesque. Fermentum posuere urna nec tincidunt praesent semper feugiat. Tortor condimentum lacinia quis vel eros donec ac odio. Libero id faucibus nisl tincidunt eget nullam non nisi est.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Mattis enim ut tellus elementum sagittis. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Malesuada pellentesque elit eget gravida cum. Nunc sed augue lacus viverra vitae. Id interdum velit laoreet id donec. Purus semper eget duis at tellus. Aliquet eget sit amet tellus cras adipiscing enim. Elit ullamcorper dignissim cras tincidunt lobortis feugiat.",
    "Lorem ipsum dolor sit amet",
    "Leo in vitae turpis massa. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Imperdiet proin fermentum leo vel orci porta non pulvinar. Rutrum tellus pellentesque eu tincidunt tortor. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Cum sociis natoque penatibus et magnis. Suspendisse interdum consectetur libero id faucibus. Sit amet justo donec enim diam vulputate ut. Malesuada fames ac turpis egestas. Mattis nunc sed blandit libero volutpat. Eget arcu dictum varius duis. Turpis egestas sed tempus urna et. Fermentum odio eu feugiat pretium nibh ipsum. Ac placerat vestibulum lectus mauris ultrices eros.",
    "Placerat duis ultricies lacus sed. Purus in massa tempor nec feugiat nisl pretium fusce. Tristique magna sit amet purus gravida. Turpis egestas pretium aenean pharetra magna. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper.
Nibh cras pulvinar mattis nunc. Sed risus ultricies tristique nulla aliquet enim tortor at. Elementum sagittis vitae et leo duis ut diam quam. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis.",
    1,
    "2023-06-08",
    "2023-06-23",
    "2023-06-30",
    "2023-07-15",
    "2023-07-30",
    42,
    12,
    NULL,
    2
  ),

  (
    "test42",
    "Lo",
    "Lorem",
    "Lorem ipsum dolor sit amet",
    "Leo ",
    "Placerat",
    1,
    "2023-06-27",
    "2023-04-28",
    "2023-06-30",
    "2023-07-15",
    "2023-07-30",
    42,
    12,
    NULL,
    1
  ),
  (
    "test54",
    "Lo",
    "Lorem",
    "Lorem ipsum dolor sit amet",
    "Leo ",
    "Placerat",
    1,
    "2023-05-01",
    "2023-05-15",
    "2023-05-20",
    "2023-06-04",
    "2023-06-20",
    42,
    12,
    NULL,
    3
  );
INSERT INTO users_roles (user_id, role_id)
VALUES (1, 1),
  (1, 3),
  (2, 2),
  (3, 2),
  (4, 2),
  (4, 3);
INSERT INTO users_decisions (user_id, decision_id)
VALUES (2, 1),
  (3, 2),
  (1, 4),
  (4, 3),
  (1, 5),
  (1, 6);
INSERT INTO tagged_as_experts (user_id, decision_id)
VALUES (1, 1),
  (1, 3),
  (4, 4),
  (4, 2),
  (1, 4),
  (4, 3),
  (4, 5),
  (4, 6);
INSERT INTO tagged_as_impacted (user_id, decision_id)
VALUES (2, 1),
  (3, 1),
  (2, 2),
  (3, 2),
  (3, 3),
  (2, 3),
  (3, 4),
  (2, 4),
  (4, 5),
  (2, 6);
INSERT INTO comments (user_id, decision_id, creation_date, comment)
VALUES (
    1,
    2,
    "2023-06-08",
    "PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER "
  ),
  (
    1,
    3,
    "2023-06-09",
    "PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER "
  ),
  (
    1,
    4,
    "2023-06-11",
    "PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER "
  ),
  (
    2,
    1,
    "2023-06-12",
    " L'idée me semble excellente, néamoins je nuancerais sur le fait qu'il faudrait avant tout tester le test. Je m'explique: si nous ne testons pas le test qu'est-ce qui nous prouve que le test test vraiment? Et j'irai même plus loin, je dirai qu'il faudrait même tester le test qui test le test pour tester si le test du test test vraiment bien le test car on ne peu pas se permettre que le test n'éprouve pas totalement la resistance de notre test, du coup je propose égalment de placer holder..."
  ),
  (
    2,
    3,
    "2023-06-12",
    "Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Quam vulputate dignissim suspendisse in est ante. Velit scelerisque in dictum non consectetur a erat nam at. Tellus pellentesque eu tincidunt tortor aliquam nulla. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Sed turpis tincidunt id aliquet risus feugiat in ante. Purus gravida quis blandit turpis. Tincidunt vitae semper quis lectus nulla at volutpat diam. Tristique et egestas quis ipsum suspendisse ultrices gravida. Placerat duis ultricies lacus sed. Purus in massa tempor nec feugiat nisl pretium fusce. Tristique magna sit amet purus gravida. Turpis egestas pretium aenean pharetra magna. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper.
Nibh cras pulvinar mattis nunc. Sed risus ultricies tristique nulla aliquet enim tortor at. Elementum sagittis vitae et leo duis ut diam quam. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Massa massa ultricies mi quis hendrerit dolor magna eget. Natoque penatibus et magnis dis parturient. Duis at consectetur lorem donec massa sapien faucibus et. Vel pharetra vel turpis nunc eget lorem dolor sed. Commodo ullamcorper a lacus vestibulum sed. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Amet justo donec enim diam vulputate ut. Leo vel orci porta non pulvinar. Enim facilisis gravida neque convallis a cras semper auctor. Vitae suscipit tellus mauris a. Velit scelerisque in dictum non consectetur a. Et ultrices neque ornare aenean euismod elementum nisi quis. Scelerisque mauris pellentesque pulvinar pellentesque. Fermentum posuere urna nec tincidunt praesent semper feugiat. Tortor condimentum lacinia quis vel eros donec ac odio. Libero id faucibus nisl tincidunt eget nullam non nisi est."
  ),
  (
    2,
    2,
    "2023-06-15",
    "Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa Wingardium leviosa "
  ),
  (
    4,
    2,
    "2023-06-16",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Mattis enim ut tellus elementum sagittis. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Malesuada pellentesque elit eget gravida cum. Nunc sed augue lacus viverra vitae. Id interdum velit laoreet id donec. Purus semper eget duis at tellus. Aliquet eget sit amet tellus cras adipiscing enim. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Etiam erat velit scelerisque in dictum non consectetur a. Diam quam nulla porttitor massa id neque. Et egestas quis ipsum suspendisse. Neque volutpat ac tincidunt vitae. Porttitor eget dolor morbi non arcu risus quis varius. Quis lectus nulla at volutpat diam ut venenatis tellus.
Leo in vitae turpis massa. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Imperdiet proin fermentum leo vel orci porta non pulvinar. Rutrum tellus pellentesque eu tincidunt tortor. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Cum sociis natoque penatibus et magnis. Suspendisse interdum consectetur libero id faucibus. Sit amet justo donec enim diam vulputate ut. Malesuada fames ac turpis egestas."
  ),
  (
    4,
    4,
    "2023-06-17",
    "Non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Quam vulputate dignissim suspendisse in est ante. Velit scelerisque in dictum non consectetur a erat nam at. Tellus pellentesque eu tincidunt tortor aliquam nulla. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Sed turpis tincidunt id aliquet risus feugiat in ante. Purus gravida quis blandit turpis. Tincidunt vitae semper quis lectus nulla at volutpat diam. Tristique et egestas quis ipsum suspendisse ultrices gravida. Placerat duis ultricies lacus sed. Purus in massa tempor nec feugiat nisl pretium fusce. Tristique magna sit amet purus gravida. Turpis egestas pretium aenean pharetra magna. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper.
Nibh cras pulvinar mattis nunc. Sed risus ultricies tristique nulla aliquet enim tortor at. Elementum sagittis vitae et leo duis ut diam quam. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Massa massa ultricies mi quis hendrerit dolor magna eget. Natoque penatibus et magnis dis parturient. Duis at consectetur lorem donec massa sapien faucibus et. Vel pharetra vel turpis nunc eget lorem dolor sed."
  );
INSERT INTO concernedhub (title)
VALUES ("Hub France");
SET GLOBAL event_scheduler = ON;
CREATE EVENT update_status_event ON SCHEDULE EVERY 1 DAY STARTS CURRENT_TIMESTAMP DO
UPDATE decisions
SET status_id = 7
WHERE status_id = 2
  AND DATE(now()) >= deadline_comment + 7;
UPDATE decisions
SET status_id = 5,
  is_validated = 0
WHERE status_id = 4
  AND DATE(now()) >= deadline_conflict + 15;
  UPDATE decisions
SET status_id = 6
WHERE status_id = 5
  AND DATE(now()) >= final_take_decision + 90;
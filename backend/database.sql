CREATE TABLE user (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  pseudo VARCHAR(255) NOT NULL UNIQUE,
  hashPassword VARCHAR(255) NOT NULL,
  score INT);

CREATE TABLE questions (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  quest VARCHAR(255) NOT NULL,
  repA VARCHAR(255) NOT NULL,
  repB VARCHAR(255) NOT NULL,
  repC VARCHAR(255),
  repD VARCHAR(255),
  goodReponse ENUM ('repA','repB','repC','repD') NOT NULL,
  authorId INT NOT NULL DEFAULT 1,
  CONSTRAINT user
  FOREIGN KEY (authorId)
  REFERENCES user(id)
);

INSERT INTO user (pseudo, hashPassword)
VALUES ('Fabien','dev');

INSERT INTO questions (quest, repA, repB, repC, repD, goodReponse)
VALUES
('En dehors de celles apprises durant la formation, dans quelle technologie Delphine est elle formée ?', 'Swift', 'Python', 'C#', 'COBOL', 'repA'),
('Comment Nils s''est fait connaitre nationalemment par la Wild ?', 'En parlant de barbecue sur Slack', 'En partageant un site non adapté sur Slack', 'En piratant Slack', 'En se faisant embarquer par les russes durant la formation', 'repA'),
('Où Cathy va t-elle partir vivre après la formation', 'En russie', 'En Bourgogne', 'En Auvergne', 'En Lozere', 'repC'),
('En dehors de celles apprises durant la formation, dans quelle technologie Wilhem est il formé ?', 'Swift', 'Python', 'C#', 'COBOL', 'repB'),
('Avant cette formation où Amaury a t-il travaillé ?', 'SFAM', 'Amazon', 'Mc Donald', 'Pum Plastiques', 'repD'),
('Quel sport Alex pratique t-il régulièrement ?', 'Hockey sur glace', 'Hockey sur gazon', 'Hockey sur luge', 'Street Hockey', 'repA'),
('Avant cette formation où Julien a t-il travaillé ?', 'SFAM', 'Amazon', 'Tesla', 'Pum Plastiques', 'repA'),
('Où Laetitia souhaitée t''elle partir aprés sa formation et avant son départ de celle ci', 'En concepteur développeur d''aplication', 'En Data Analyste', 'En Cyber sécurité', 'En élevage de chats', 'repC'),
('Qu''il y''a t-il sur le fond meet de Nicolas', 'Un chien avec une échalotte sur la tête', 'Un chien avec un ail sur la tête', 'Un chat avec une échalotte sur la tête', 'Un chat avec un ail sur la tête', 'repB'),
('D''où Thomas V est il originaire ?', 'Alpes', 'Pyrénées', 'Belgique', 'Vosges', 'repA'),
('D''où Fabien est il originaire ?', 'PACA', 'Auvergne', 'Limousin', 'Centre', 'repB'),
('Où a travaillé Waheb avant cette formation', 'Cash service', 'Easy Cash', 'Cash App', 'Cash Converters', 'repA'),
('Quel est l''endroit préféré de Thomas D à 19 formation', 'Les canapés', 'La salle de formation', 'Le parking', 'Les bureux d''autonomies', 'repA'),
('Où Nicolas W a t-il vécu avant d''arriver a Valence', 'Chine', 'Japon', 'Taiwan', 'Corée du sud', 'repC'),
('Comment s''apellait la première personne qui a quitté la formation', 'Laure', 'Laurence', 'Benjamin', 'Bryan', 'repD'),
('Comment s''apellait la deuxième personne qui a quitté la formation', 'Laure', 'Laurence', 'Benjamin', 'Bryan', 'repB'),
('Comment s''apellait la personne qui n''a jamais commencé la formation (et que Thomas D à remplacée)', 'Murielle', 'Dominique', 'Danielle', 'Mireille', 'repC');
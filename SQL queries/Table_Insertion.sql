INSERT into users (Username, Password)
VALUES ('bMutai', 'blazzin'), ('gSteiner', 'ganon'), ('yBabaria','josh');

INSERT INTO groups (UserID, GroupName, Leader)
VALUES (1, '412 Group 32', 1);

INSERT INTO groups (UserID, GroupName, Leader)
VALUES (2, '412 Group 32', 1), (3, '412 Group 32', 1);

INSERT INTO title (GroupID, TitleName, Description, Genre, ReleaseYear, RuntimeMinutes)
VALUES (1, 'Black Adam', '‘Anti-Hero saving his people’', 'Action',2022,165), 
	   (1, 'Forrest Gump', 'Dumb guy becomes lucky guy', 'Drama',1994,182), 
       (1, 'Sonic the Hedgehog', 'Hedgehog runs fast and saves people', 'Action',2020,99);

INSERT INTO Rating(GroupID, UserID, TitleID, RatingNumber, likeNumber, ratingComment) VALUES 
(1, 1, 1, 56, 0, 'not good'), (2, 2, 1, 47, 0, 'great action, poor story'), (1, 3, 1, 78, 1, 'Rock carries the movie but the story should carry the movie'),
(1, 1, 2, 88, 1, 'Really good'), (1, 2, 2, 90, 1, 'God given gift'), (3, 3, 2, 100, 1, 'The Best movie in the World'),
(1, 1, 3, 77, 1, 'Funny but could be better'), (1, 2, 3, 88, 1, 'Love the energy but missing a good story'), (1, 3, 3, 66, 0, 'Overrated Hedehod annoys people');

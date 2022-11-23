CREATE TABLE IF NOT EXISTS Users(
            UserID SERIAL PRIMARY KEY,
            Username VARCHAR(18),
            Password VARCHAR(100));

CREATE TABLE IF NOT EXISTS Groups(
            GroupID SERIAL PRIMARY KEY,
            UserID SERIAL,
            GroupName VARCHAR(18) UNIQUE,
            Leader SERIAL,
            FOREIGN KEY(UserID) REFERENCES Users(UserID));

CREATE TABLE IF NOT EXISTS Title(
			TitleID SERIAL PRIMARY KEY,
            GroupID SERIAL,
            TitleName VARCHAR(18),
            Description VARCHAR(40),
            Genre VARCHAR(40),
            ReleaseYear VARCHAR(4),
            RuntimeMinutes INT,
FOREIGN KEY(GroupID) REFERENCES Groups(GroupID));

CREATE TABLE IF NOT EXISTS Rating(
		RatingID SERIAL PRIMARY KEY,
		GroupID SERIAL,
		UserID SERIAL,
		TitleID SERIAL,
		RatingNumber SMALLINT,
		LikeNumber INT,
		RatingComment VARCHAR(280),
		FOREIGN KEY(GroupID) REFERENCES Groups(GroupID),
		FOREIGN KEY(UserID) REFERENCES Users(UserID),
		FOREIGN KEY(TitleID) REFERENCES Title(TitleID));
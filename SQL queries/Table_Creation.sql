CREATE TABLE IF NOT EXISTS Users(
            UserID SERIAL PRIMARY KEY,
            Username VARCHAR(18),
            Password VARCHAR(100));

CREATE TABLE IF NOT EXISTS Title(
			TitleID SERIAL PRIMARY KEY,
            TitleName VARCHAR(18),
            Description VARCHAR(40),
            Genre VARCHAR(40),
            ReleaseYear VARCHAR(4),
            RuntimeMinutes INT
);

CREATE TABLE IF NOT EXISTS Rating(
		RatingID SERIAL PRIMARY KEY,
		UserID SERIAL,
		TitleID SERIAL,
		RatingNumber SMALLINT,
		LikeNumber INT,
		RatingComment VARCHAR(280),
		FOREIGN KEY(UserID) REFERENCES Users(UserID),
		FOREIGN KEY(TitleID) REFERENCES Title(TitleID));
pragma foreign_keys = 1;

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS genre_boardgames;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS boardgames;
-- DROP TABLE boardgames;

CREATE TABLE boardgames (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(200) NOT NULL UNIQUE,
    max_players INTEGER DEFAULT 4
    -- avg_rating DECIMAL(4, 2), -- 10.67, 1.25, 100.6, 9000
    -- genre VARCHAR(50) NOT NULL
);

CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reviewer_name VARCHAR NOT NULL,
    comment TEXT NOT NULL,
    rating INTEGER,
    -- boardgame_id INTEGER,
    -- FOREIGN KEY (boardgame_id) REFERENCES boardgames (id) ON DELETE CASCADE
    boardgame_id INTEGER REFERENCES boardgames (id) ON DELETE SET NULL
);

CREATE TABLE genres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    genre VARCHAR NOT NULL
);

CREATE TABLE genre_boardgames (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER REFERENCES boardgames(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE
);
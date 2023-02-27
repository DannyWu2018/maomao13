-- SELECT name, genre
--
-- SELECT *
-- FROM boardgames;

-- SELECT name FROM boardgames
-- WHERE id = 5;

-- SELECT name, avg_rating
-- FROM boardgames
-- WHERE avg_rating >= 8.5;

-- SELECT name, max_players
-- FROM boardgames
-- WHERE max_players < 5;

-- SELECT name, max_players, avg_rating
-- FROM boardgames
-- WHERE max_players < 5 AND avg_rating >= 8.5;

-- DELETE FROM boardgames
-- WHERE avg_rating < 8.5;

-- UPDATE boardgames
-- SET avg_rating = 9.0
-- WHERE id = 5;

-- UPDATE boardgames
-- SET avg_rating = avg_rating + 1, max_players = 2
-- WHERE max_players = 4 AND avg_rating > 8.5;

-- Alec's favorite game
-- 'Alec''s favorite game'

-- SELECT * FROM boardgames
-- WHERE max_players BETWEEN 4 AND 6;

-- SELECT * FROM boardgames
-- WHERE max_players IN (4, 6);

-- SELECT * FROM boardgames
-- WHERE name LIKE 'terra%';

-- SELECT * FROM boardgames
-- ORDER BY name;

-- SELECT * FROM boardgames
-- ORDER BY name
-- LIMIT 1
-- OFFSET 1;
-- LIMIT -1
-- OFFSET 5;


-- SELECT boardgames.name, boardgames.id, reviews.boardgame_id, reviews.comment FROM boardgames
-- INNER JOIN reviews ON (boardgames.id = reviews.boardgame_id);
-- WHERE boardgames.id = 6;


-- SELECT boardgames.name, boardgames.id, genre_boardgames.game_id, genre_boardgames.genre_id, genres.id, genres.genre, reviews.comment
-- FROM boardgames
-- JOIN genre_boardgames ON (genre_boardgames.game_id = boardgames.id)
-- JOIN genres ON (genre_boardgames.genre_id = genres.id)
-- JOIN reviews ON (boardgames.id = reviews.boardgame_id)
-- WHERE boardgames.id = 6;


-- SELECT * FROM boardgames
-- JOIN reviews ON (boardgames.id = reviews.boardgame_id)
-- WHERE id = ?

-- SELECT name FROM boardgames
-- INNER JOIN reviews ON (boardgames.id = reviews.boardgame_id);
-- WHERE rating > 6;

-- SELECT MAX(rating), name FROM reviews
-- JOIN boardgames ON (reviews.boardgame_id = boardgames.id);

-- SELECT SUM(rating) FROM reviews
-- WHERE boardgame_id = 2;

-- SELECT AVG(rating), boardgame_id FROM reviews
-- GROUP BY boardgame_id
-- HAVING boardgame_id IN (5, 6);

-- SELECT AVG(rating), boardgame_id FROM reviews
-- WHERE boardgame_id IN (5, 6)
-- GROUP BY boardgame_id
-- HAVING boardgame_id IN (6);

SELECT name FROM boardgames
INNER JOIN reviews ON (boardgames.id = reviews.boardgame_id)
WHERE rating > 6;

SELECT boardgame_id FROM reviews
WHERE rating > 6;

SELECT name FROM boardgames
WHERE id IN (
    SELECT boardgame_id FROM reviews
    WHERE rating > 6
);

INSERT INTO genre_boardgames (game_id, genre_id)
VALUES
-- (7, 4)
(7, (
    SELECT id FROM genres WHERE genre = 'Coop'
));
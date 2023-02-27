-- INSERT INTO boardgames (name, max_players, genre, avg_rating)
-- VALUES
-- ('Gloomhaven', 4, 'Adventure', 8.8),
-- ('Pandemic Legacy: Season 1', 4, 'Cooperative', 8.62),
-- ('Brass: Birmingham', 4, 'Economic', 8.66),
-- ('Terraforming Mars', 5, 'Economic', 8.43),
-- ('Twilight Imperium: Fourth Edition', 6, 'Strategy', 8.7),
-- ('Spirit Island', 4, 'Cooperative', 8.34),
-- ('Mage Knight', 4, 'Adventure', 8.1),
-- ('Rising Sun', 5, 'Strategy', 7.88),
-- ('Mystic Vale', 4, 'Strategy', 8.5),
-- ('Wingspan', 5, 'Economic', 8.85);

INSERT INTO boardgames (name, max_players)
VALUES
('Gloomhaven', 3),
('Pandemic Legacy: Season 1', 4),
('Brass: Birmingham', 6),
('Terraforming Mars', 5),
('Twilight Imperium: Fourth Edition', 6),
('Spirit Island', 8),
('Mage Knight', 7),
('Rising Sun', 5),
('Mystic Vale', 4),
('Wingspan', 5),
('Terra Mystica', 5);

-- INSERT INTO boardgames (name, avg_rating, genre)
-- VALUES
-- ('Terra Mystica', 7.6, 'Strategy');

INSERT INTO reviews (reviewer_name, comment, rating, boardgame_id)
VALUES
('Alec', 'This game is sweet', 10, 6),
('Dan', '2gloomy4me', 5, 1),
('Olivia', 'Even though it''s co-op, it''s pretty fun', 7, 6),
('Nate', 'Animals are lame and so are animal board games', 1, 10),
('David', 'Honestly, too soon.', null, 2),
('Bill', 'I can be a space pirate, enough said', 9, 5);

INSERT INTO genres (genre)
VALUES
('Strategy'),
('Adventure'),
('Economic'),
('Coop');

INSERT INTO genre_boardgames (game_id, genre_id)
VALUES
(5, 1),
(5, 3),
(1, 4),
(1, 2),
(2, 1),
(2, 4),
(4, 3),
(6, 4);
CREATE DATABASE notekeeper;

USE notekeeper;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(40) NOT NULL,
  first_name VARCHAR(20) NULL,
  last_name VARCHAR(20) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT UTC_TIMESTAMP(),
  PRIMARY KEY (id),
  UNIQUE KEY (email)
);

CREATE TABLE password (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  salt VARCHAR(256),
  pwd VARCHAR(256),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE file (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(64) NOT NULL,
  encoding VARCHAR(15) NOT NULL,
  size INT NOT NULL,
  creator_id INT NOT NULL,
  content MEDIUMBLOB NULL,
  created_at TIMESTAMP NOT NULL DEFAULT UTC_TIMESTAMP(),
  PRIMARY KEY (id),
  FOREIGN KEY (creator_id) REFERENCES user (id)
);

CREATE TABLE rating_counter (
  id INT NOT NULL AUTO_INCREMENT,
  one_star_count INT NOT NULL DEFAULT 0,
  two_star_count INT NOT NULL DEFAULT 0,
  three_star_count INT NOT NULL DEFAULT 0,
  four_star_count INT NOT NULL DEFAULT 0,
  five_star_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT UTC_TIMESTAMP(),
  PRIMARY KEY (id)
);

CREATE TABLE midi_record (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  rating_id INT NOT NULL,
  view_count INT NOT NULL DEFAULT 0,
  genre VARCHAR(64) NULL,
  midi_file_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT UTC_TIMESTAMP(),
  PRIMARY KEY (id),
  FOREIGN KEY (midi_file_id) REFERENCES file (id),
  FOREIGN KEY (rating_id) REFERENCES rating_counter (id)
);

CREATE TABLE midi_record_shared_user (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  midi_record_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT UTC_TIMESTAMP()
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user (id),
  FOREIGN KEY (midi_record_id) REFERENCES midi_record (id)
);

CREATE TABLE user_rated (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  rating_counter_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user (id),
  FOREIGN KEY (rating_counter_id) REFERENCES rating_counter (id)
);

CREATE VIEW SolvedRatingCounters AS
  SELECT
    id,
    one_star_count AS oneStarCount,
    two_star_count AS twoStarCount,
    three_star_count AS threeStarCount,
    four_star_count AS fourStarCount,
    five_star_count AS fiveStarCount,
    (
      (
          5 * five_star_count
        + 4 * four_star_count
        + 3 * three_star_count
        + 2 * two_star_count
        + 1 * one_star_count
      ) / (
          five_star_count
        + four_star_count
        + three_star_count
        + two_star_count
        + one_star_count
      )
    ) AS rating,
    created_at AS createdAt
  FROM rating_counter;

CREATE VIEW MidiRecords AS
  SELECT
    mr.id AS id,
    mr.name AS name,
    mr.is_public AS isPublic,
    mr.view_count AS viewCount,
    mr.genre AS genre,
    mr.created_at AS createdAt,

    f.id AS midiFileId,
    f.name AS midiFileName,
    f.mime_type AS midiFileMimeType,
    f.encoding AS midiFileEncoding,
    f.size AS midiFileSize,
    f.content AS midiFileContent,
    f.created_at AS midiFileCreatedAt,
    
    src.id AS ratingId,
    src.rating AS rating,
    src.oneStarCount AS ratingOneStarCount,
    src.twoStarCount AS ratingTwoStarCount,
    src.threeStarCount AS ratingThreeStarCount,
    src.fourStarCount AS ratingFourStarCount,
    src.fiveStarCount AS ratingFiveStarCount,
    src.createdAt AS ratingCreatedAt
  FROM midi_record mr
  JOIN file f
    ON mr.midi_file_id = f.id
  JOIN SolvedRatingCounters src
    ON src.id = mr.rating_id;

-- BOOKS

CREATE TABLE IF NOT EXISTS books (
  id BLOB(16) PRIMARY KEY,
  -- bibliographic info.
  title VARCHAR(100) NOT NULL,
  series_id BLOB(16),
  series_number INTEGER,
  language VARCHAR(100) NOT NULL,
  publisher_id BLOB(16) NOT NULL,
  edition INTEGER,
  release_date VARCHAR(100) NOT NULL,
  -- translations info.
  original_title VARCHAR(100),
  -- personal notes
  rating INTEGER,
  FOREIGN KEY (publisher_id) REFERENCES book_publishers(id)
);

CREATE TABLE IF NOT EXISTS book_authors (
  id BLOB(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS books_authors_relations (
  book_id BLOB(16) NOT NULL,
  book_author_id BLOB(16) NOT NULL,
  PRIMARY KEY (book_id, book_author_id),
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (book_author_id) REFERENCES book_authors(id)
);

CREATE TABLE IF NOT EXISTS book_publishers (
  id BLOB(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS book_series (
  id BLOB(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS book_translators (
  id BLOB(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS books_translators_relations (
  book_id BLOB(16) NOT NULL,
  book_translator_id BLOB(16) NOT NULL,
  PRIMARY KEY (book_id, book_translator_id),
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (book_translator_id) REFERENCES book_translators(id)
);

-- VIDEOGAMES

CREATE TABLE IF NOT EXISTS videogames (
  id BLOB(16) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  rating INTEGER
);

CREATE TABLE IF NOT EXISTS videogame_developers (
  id BLOB(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS videogames_developers_relations (
  videogame_id BLOB(16) NOT NULL,
  videogame_developer_id BLOB(16) NOT NULL,
  tag VARCHAR(100),
  PRIMARY KEY (videogame_id, videogame_developer_id),
  FOREIGN KEY (videogame_id) REFERENCES videogames(id),
  FOREIGN KEY (videogame_developer_id) REFERENCES videogame_developers(id)
);

CREATE TABLE IF NOT EXISTS videogame_platforms (
  id BLOB(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  fullname VARCHAR(100) NOT NULL UNIQUE,
  company VARCHAR(100),
  generation VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS videogames_platforms_relations (
  videogame_id BLOB(16) NOT NULL,
  videogame_platform_id BLOB(16) NOT NULL,
  PRIMARY KEY (videogame_id, videogame_platform_id),
  FOREIGN KEY (videogame_id) REFERENCES videogames(id),
  FOREIGN KEY (videogame_platform_id) REFERENCES videogame_platforms(id)
);

CREATE TABLE IF NOT EXISTS videogame_publishers (
  id BLOB(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS videogames_publishers_relations (
  videogame_id BLOB(16) NOT NULL,
  videogame_publisher_id BLOB(16) NOT NULL,
  PRIMARY KEY (videogame_id, videogame_publisher_id),
  FOREIGN KEY (videogame_id) REFERENCES videogames(id),
  FOREIGN KEY (videogame_publisher_id) REFERENCES videogame_publishers(id)
);

CREATE TABLE IF NOT EXISTS videogame_releases (
  videogame_id BLOB(16) NOT NULL,
  date VARCHAR(100) NOT NULL,
  tag VARCHAR(100),
  PRIMARY KEY (videogame_id, date, tag),
  FOREIGN KEY (videogame_id) REFERENCES videogames(id)
);

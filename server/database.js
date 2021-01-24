const sqlite3 = require('sqlite3').verbose();
const DB_SOURCE = 'virtual-library.db';

const dbName = `${__dirname}/${DB_SOURCE}`;

const db = new sqlite3.Database(dbName, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log(`Successful connection to the database '${dbName}'`);
});

db.run(`
CREATE TABLE IF NOT EXISTS videogame_developers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogame_developers" table');
  // Database seeding
  db.run(`
  INSERT INTO videogame_developers (id, name) VALUES
    (1, 'BioWare'),
    (2, 'Demiurge Studios'),
    (3, 'Edge of Reality')
  ;`, (error) => {
    if (error) {
      console.error(error.message);
    }
    console.log('Successful creation of "videogame_publishers" data.');
  });
});

db.run(`
CREATE TABLE IF NOT EXISTS videogame_platforms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  fullname VARCHAR(100),
  company VARCHAR(100)
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogame_platforms" table');
  // Database seeding
  db.run(`
  INSERT INTO videogame_platforms (
		id, name, fullname, company
	) VALUES
		(1, 'PC', NULL, NULL),
		(2, 'PSX', 'PlayStation', 'Sony'),
		(3, 'PS2', 'PlayStation 2', 'Sony'),
		(4, 'PS3', 'PlayStation 3', 'Sony'),
		(5, 'PS4', 'PlayStation 4', 'Sony'),
		(6, 'PS5', 'PlayStation 5', 'Sony'),
    (7, 'X360', 'XBOX 360', 'Microsoft')
  ;`, (error) => {
    if (error) {
      console.error(error.message);
    }
    console.log('Successful creation of "videogame_platforms" data.');
  });
});

db.run(`
CREATE TABLE IF NOT EXISTS videogame_publishers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogame_publishers" table');
  // Database seeding
  db.run(`
  INSERT INTO videogame_publishers (id, name) VALUES
    (1, 'Microsoft Game Studios'),
    (2, 'Electronic Arts')
  ;`, (error) => {
    if (error) {
      console.error(error.message);
    }
    console.log('Successful creation of "videogame_publishers" data.');
  });
});

db.run(`
CREATE TABLE IF NOT EXISTS videogames (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(100) NOT NULL
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogames" table');
  // Database seeding
  db.run(`
  INSERT INTO videogames (id, title) VALUES
    (1, 'Mass Effect'),
    (2, 'Mass Effect 2'),
    (3, 'Mass Effect 3')
  ;`, (error) => {
    if (error) {
      console.error(error.message);
    }
    console.log('Successful creation of "videogames" data.');
  });
});

db.run(`
CREATE TABLE IF NOT EXISTS videogames_developers_relationship (
  videogame_id INTEGER,
  videogame_developer_id INTEGER,
  tag VARCHAR(100),
  FOREIGN KEY(videogame_id) REFERENCES videogames(id),
  FOREIGN KEY(videogame_developer_id) REFERENCES videogame_developers(id)
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogames_developers_relationship" table');
  // Database seeding
  db.run(`
  INSERT INTO videogames_developers_relationship (
    videogame_id, videogame_developer_id, tag
  ) VALUES
    (1, 1, 'X360'),
    (1, 2, 'PC'),
    (1, 3, 'PS3'),
    (2, 1, NULL),
    (3, 1, NULL)
  ;`, (error) => {
    if (error) {
      console.error(error.message);
    }
    console.log('Successful creation of "videogames_developers_relationship" data.');
  });
});

db.run(`
CREATE TABLE IF NOT EXISTS videogames_platforms_relationship (
  videogame_id INTEGER,
  videogame_platform_id INTEGER,
  FOREIGN KEY(videogame_id) REFERENCES videogames(id),
  FOREIGN KEY(videogame_platform_id) REFERENCES videogame_platforms(id)
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogames_platforms_relationship" table');
  // Database seeding
  db.run(`
  INSERT INTO videogames_platforms_relationship (
    videogame_id, videogame_platform_id
  ) VALUES
    (1, 1),
    (1, 4),
    (1, 7),
    (2, 1),
    (2, 4),
    (2, 7),
    (3, 1),
    (3, 4),
    (3, 7)
  ;`, (error) => {
    if (error) {
      console.error(error.message);
    }
    console.log('Successful creation of "videogames_developers_relationship" data.');
  });
});

db.run(`
CREATE TABLE IF NOT EXISTS videogames_publishers_relationship (
  videogame_id INTEGER,
  videogame_publisher_id INTEGER,
  tag VARCHAR(100),
  FOREIGN KEY(videogame_id) REFERENCES videogames(id),
  FOREIGN KEY(videogame_publisher_id) REFERENCES videogame_publishers(id)
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogames_publishers_relationship" table');
  // Database seeding
  db.run(`
  INSERT INTO videogames_publishers_relationship (
    videogame_id, videogame_publisher_id, tag
  ) VALUES
    (1, 1, 'X360'),
    (1, 2, 'PC; PS3'),
    (2, 2, NULL),
    (3, 2, NULL)
  ;`, (error) => {
    if (error) {
      console.error(error.message);
    }
    console.log('Successful creation of "videogames_developers_relationship" data.');
  });
});

module.exports = db;

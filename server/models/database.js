const sqlite3 = require('sqlite3').verbose();
const dbSource = `${__dirname}/virtual-library.db`;

const db = new sqlite3.Database(dbSource, (error) => {
	if (Boolean(error)) {
		console.error(error.message);
	} else {
		console.log(`Successful connection to the database '${dbSource}'`);
	}
});

// dd.bb. initializations:

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
    } else {
      console.log('Successful seeding of "videogame_developers" data.');
    }
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
    } else {
      console.log('Successful seeding of "videogame_platforms" data.');
    }
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
    } else {
      console.log('Successful seeding of "videogame_publishers" data.');
    }
  });
});

db.run(`
CREATE TABLE IF NOT EXISTS videogames (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(100) NOT NULL,
  -- main_developer_id INTEGER,
  -- main_publisher_id INTEGER,
  -- release_date VARCHAR(100) NOT NULL,
  synopsis VARCHAR(255)
  -- FOREIGN KEY (main_developer_id) REFERENCES videogame_developers(id),
  -- FOREIGN KEY (main_publisher_id) REFERENCES videogame_publishers(id)
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogames" table');
  // Database seeding
  db.run(`
  INSERT INTO videogames (
    id, title
  ) VALUES
    (1, 'Mass Effect'),
    (2, 'Mass Effect 2'),
    (3, 'Mass Effect 3')
  ;`, (error) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log('Successful seeding of "videogames" data.');
    }
  });
});

db.run(`
CREATE TABLE IF NOT EXISTS videogames_developers_relationships (
  videogame_id INTEGER NOT NULL,
  videogame_developer_id INTEGER NOT NULL,
  tag VARCHAR(100),
  PRIMARY KEY (videogame_id, videogame_developer_id),
  FOREIGN KEY (videogame_id) REFERENCES videogames(id),
  FOREIGN KEY (videogame_developer_id) REFERENCES videogame_developers(id)
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogames_developers_relationships" table');
  // Database seeding
  db.run(`
  INSERT INTO videogames_developers_relationships (
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
    } else {
      console.log('Successful seeding of "videogames_developers_relationships" data.');
    }
  });
});

db.run(`
CREATE TABLE IF NOT EXISTS videogames_platforms_relationships (
  videogame_id INTEGER NOT NULL,
  videogame_platform_id INTEGER NOT NULL,
  PRIMARY KEY (videogame_id, videogame_platform_id),
  FOREIGN KEY (videogame_id) REFERENCES videogames(id),
  FOREIGN KEY (videogame_platform_id) REFERENCES videogame_platforms(id)
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogames_platforms_relationships" table');
  // Database seeding
  db.run(`
  INSERT INTO videogames_platforms_relationships (
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
    } else {
      console.log('Successful seeding of "videogames_developers_relationships" data.');
    }
  });
});

db.run(`
CREATE TABLE IF NOT EXISTS videogames_publishers_relationships (
  videogame_id INTEGER NOT NULL,
  videogame_publisher_id INTEGER NOT NULL,
  tag VARCHAR(100),
  PRIMARY KEY (videogame_id, videogame_publisher_id),
  FOREIGN KEY (videogame_id) REFERENCES videogames(id),
  FOREIGN KEY (videogame_publisher_id) REFERENCES videogame_publishers(id)
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogames_publishers_relationships" table');
  // Database seeding
  db.run(`
  INSERT INTO videogames_publishers_relationships (
    videogame_id, videogame_publisher_id, tag
  ) VALUES
    (1, 1, 'X360'),
    (1, 2, 'PC; PS3'),
    (2, 2, NULL),
    (3, 2, NULL)
  ;`, (error) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log('Successful seeding of "videogames_developers_relationships" data.');
    }
  });
});

db.run(`
CREATE TABLE IF NOT EXISTS videogame_releases (
	videogame_id INTEGER NOT NULL,
  date VARCHAR(100) NOT NULL,
  tag VARCHAR(100),
  PRIMARY KEY (videogame_id, date, tag),
  FOREIGN KEY(videogame_id) REFERENCES videogames(id)
);
`, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Successful creation of "videogame_releases" table');
  // Database seeding
  db.run(`
  INSERT INTO videogame_releases (
    videogame_id, date, tag
  ) VALUES
    (1, '2007-11-20', 'X360:NA'),
    (1, '2007-11-22', 'X360:AU'),
    (1, '2007-11-23', 'X360:EU')
  `, (error) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log('Successful seeding of "videogame_releases" data.');
    }
  })
});

//

exports.db = db;

/**
 * Opens a connection to a given database.
 * @param {*} path 
 */
exports.open = (path) => {
	return new Promise((resolve, reject) => {
		this.db = new sqlite3.Database(path, (error) => {
			if (Boolean(error)) {
				reject(`Open error: ${error.message}`);
			} else {
				resolve(`${path} opened`);
			}
		});
	});
};

/**
 * Runs the queries: insert/delete/update.
 * Note that the callback is not written as an arrow function because arrow 
 * functions don't have their own `this` or `arguments` bindings.
 * 
 * @param {*} query 
 * @param {*} params 
 */
exports.run = (query, params = []) => {
	return new Promise((resolve, reject) => {
		this.db.run(query, params, function (error) {
			if (Boolean(error)) {
				reject(error.message);
			} else {
				resolve(this);
			}
		});
	});
};

/**
 * Reads the first row.
 * @param {*} query 
 * @param {*} params 
 */
exports.get = (query, params = []) => {
	return new Promise((resolve, reject) => {
		this.db.get(query, params, function (error, row) {
			if (Boolean(error)) {
				reject(`Read error: ${error.message}`);
			} else {
				resolve(row);
			}
		});
	});
};

/**
 * Reads a set of rows.
 * @param {*} query 
 * @param {*} params 
 */
exports.all = (query, params = []) => {
	return new Promise((resolve, reject) => {
		this.db.all(query, params, (error, rows) => {
			if (Boolean(error)) {
				reject(`Read error: ${error.message}`);
			} else {
				resolve(rows);
			}
		});
	});
};

/**
 * Returns a set of rows, one by one.
 * @param {*} query 
 * @param {*} params 
 * @param {*} action 
 */
exports.each = (query, params = [], action = (value) => value) => {
	return new Promise((resolve, reject) => {
		this.db.serialize(() => {
			this.db.each(query, params, (error, rows) => {
				if (Boolean(error)) {
					reject(`Read error: ${error.message}`);
				} else if (Boolean(row)) {
					action(row);
				}
			});
			this.db.get("", () => {
				resolve(true);
			});
		});
	});
};

/**
 * Closes the current database connection.
 */
exports.close = () => {
	return new Promise((resolve, reject) => {
		this.db.close();
		resolve(true);
	});
};
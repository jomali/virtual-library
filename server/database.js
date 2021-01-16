const sqlite3 = require("sqlite3").verbose();
const DB_SOURCE = "virtual-library.db";

const dbName = `${__dirname}/data/${DB_SOURCE}`;

const db = new sqlite3.Database(dbName, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log(`Successful connection to the database '${dbName}'`);
});

const sqlCreatePlatforms = `CREATE TABLE IF NOT EXISTS VideogamePlatforms (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(100) NOT NULL,
	fullname VARCHAR(100),
	company VARCHAR(100)
);`;

db.run(sqlCreatePlatforms, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Successful creation of 'VideogamePlatforms'");
  // Database seeding
  const sqlInsertPlatforms = `INSERT INTO VideogamePlatforms (
		id, name, fullname, company
	) VALUES
		(1, 'PC', NULL, NULL),
		(2, 'PSX', 'PlayStation', 'Sony'),
		(3, 'PS2', 'PlayStation 2', 'Sony'),
		(4, 'PS3', 'PlayStation 3', 'Sony'),
		(5, 'PS4', 'PlayStation 4', 'Sony'),
		(6, 'PS5', 'PlayStation 5', 'Sony'),
		(7, 'X360', 'XBOX 360', 'Microsoft')`;
  db.run(sqlInsertPlatforms, (error) => {
    if (error) {
      console.error(error.message);
    }
    console.log("Successful creation of test data.");
  });
});

module.exports = db;

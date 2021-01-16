const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const path = __dirname + "/views/";
const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path));

app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

app.get("/api/videogamePlatforms", (req, res, next) => {
  console.log(req);
  const sql = "SELECT * FROM videogamePlatforms";
  const params = [];

  db.all(sql, params, (err, rows) => {
    console.log(rows);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/videogamePlatforms/:id", (req, res, next) => {
  var sql = "SELECT * FROM videogamePlatforms WHERE id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

app.post("/api/videogamePlatforms/", (req, res, next) => {
  const errors = [];
  if (!req.body.name) {
    errors.push("No name specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const data = { ...req.body };
  const sql =
    "INSERT INTO videogamePlatforms (name, fullname, company) VALUES (?,?,?)";
  const params = [data.name, data.fullname, data.company];

  db.run(sql, params, function (err, result) {
    console.log("result", result);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

// -- Reasonably efficient pagination without OFFSET
// -- SQLite version (Adapted from MS SQL syntax)
// -- Source: http://www.phpbuilder.com/board/showpost.php?p=10376515&postcount=6

// SELECT foo, bar, baz, quux FROM table
//  WHERE oid NOT IN ( SELECT oid FROM table
//                     ORDER BY title ASC LIMIT 50 )
//  ORDER BY title ASC LIMIT 10

app.put("/api/videogamePlatforms/:id", (req, res, next) => {
  const data = { ...req.body };
  db.run(
    `UPDATE videogamePlatforms set 
           name = COALESCE(?,name), 
           fullname = COALESCE(?,fullname), 
           company = COALESCE(?,company) 
           WHERE id = ?`,
    [data.name, data.fullname, data.company, req.params.id],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes,
      });
    }
  );
});

app.delete("/api/videogamePlatforms/:id", (req, res, next) => {
  db.run(
    "DELETE FROM videogamePlatforms WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const db = require('../database');
const table = 'videogame_platforms';

const create = (req, res, next) => {
  const errors = [];
  if (!req.body.name) {
    errors.push('No name specified');
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(',') });
    return;
  }
  const data = { ...req.body };
  const sql = `INSERT INTO ${table} (name, fullname, company) VALUES (?,?,?)`;
  const params = [data.name, data.fullname, data.company];

  db.run(sql, params, function (err, result) {
    console.log('result', result);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: data,
      id: this.lastID,
    });
  });
};

const read = (req, res, next) => {
  var sql = `SELECT * FROM ${table} WHERE id = ?`;
  var params = [req.params.id];

  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
};

const readAll = (req, res, next) => {
  const sql = `SELECT * FROM ${table}`;
  const params = [];

  return db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
};

const remove = (req, res, next) => {
  db.run(
    `DELETE FROM ${table} WHERE id = ?`,
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: 'deleted', changes: this.changes });
    }
  );
};

const search = (req, res, next) => {
  return null;

  // -- Reasonably efficient pagination without OFFSET
  // -- SQLite version (Adapted from MS SQL syntax)
  // -- Source: http://www.phpbuilder.com/board/showpost.php?p=10376515&postcount=6

  // SELECT foo, bar, baz, quux FROM table
  //  WHERE oid NOT IN ( SELECT oid FROM table
  //                     ORDER BY title ASC LIMIT 50 )
  //  ORDER BY title ASC LIMIT 10
};

const update = (req, res, next) => {
  const data = { ...req.body };
  db.run(
    `UPDATE ${table} set 
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
        message: 'success',
        data: data,
        changes: this.changes,
      });
    }
  );
};

module.exports = {
  create,
  delete: remove,
  read,
  readAll,
  update,
};

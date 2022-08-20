const db = require('./database');
const table = 'videogame_platforms';

module.exports = {
  /**
   * Creates a new `videogamePlatform` element with the given `data`
   * 
   * @param {*} data
   */
  create: async (data) => {
    try {
      const result = await db.run(
        `INSERT INTO ${table} (name, fullname, company) 
        VALUES (?,?,?)`,
        [data.name, data.fullname, data.company]
      );
      return result;
    } catch (error) {
      console.error('[ERROR] videogamePlatforms.create: ', error.message);
      throw error;
    }
    // const errors = [];
    // if (!req.body.name) {
    //   errors.push('No name specified');
    // }
    // if (errors.length) {
    //   res.status(400).json({ error: errors.join(',') });
    //   return;
    // }
    // const data = { ...req.body };
    // const sql = `INSERT INTO ${table} (name, fullname, company) VALUES (?,?,?)`;
    // const params = [data.name, data.fullname, data.company];
  
    // db.run(sql, params, function (err, result) {
    //   console.log('result', result);
    //   if (err) {
    //     res.status(400).json({ error: err.message });
    //     return;
    //   }
    //   res.json({
    //     message: 'success',
    //     data: data,
    //     id: this.lastID,
    //   });
    // });
  },

  /**
   * Deletes the `videogamePlatform` element with the given `id`
   * 
   * @param {*} id 
   */
  delete: async (id) => {
    try {
      const result = await db.run(
        `DELETE FROM ${table} 
        WHERE id = ?`,
        [id]
      );
      return result;
    } catch (error) {
      console.error('[ERROR] videogamePlatforms.delete: ', error.message);
      throw error;
    }
    // db.run(
    //   `DELETE FROM ${table} WHERE id = ?`,
    //   req.params.id,
    //   function (err, result) {
    //     if (err) {
    //       res.status(400).json({ error: res.message });
    //       return;
    //     }
    //     res.json({ message: 'deleted', changes: this.changes });
    //   }
    // );
  },

  /**
   * @param {*} id
   * @returns The `videogamePlatform` element with the given `id`
   */
  read: async (id) => {
    try {
      const result = await db.run(
        `SELECT ${table}.*
        FROM ${table} 
        WHERE id = ?`,
        [id]
      );
      return result;
    } catch (error) {
      console.error('[ERROR] videogamePlatforms.read: ', error.message);
      throw error;
    }
  },

  /**
   * @returns All the `videogamePlatform` elements
   */
  readAll: async () => {
    // -- Reasonably efficient pagination without OFFSET
    // -- SQLite version (Adapted from MS SQL syntax)
    // -- Source: http://www.phpbuilder.com/board/showpost.php?p=10376515&postcount=6   
    // SELECT foo, bar, baz, quux FROM table
    //  WHERE oid NOT IN ( SELECT oid FROM table
    //                     ORDER BY title ASC LIMIT 50 )
    //  ORDER BY title ASC LIMIT 10

    try {
      const result = await db.all(
        `SELECT ${table}.*
        FROM ${table}
        --LIMIT ${'offset'}, ${'size'}`
      );
      return result;
    } catch (error) {
      console.error('[ERROR] videogamePlatforms.readAll', error.message);
      throw error;
    }
  },

  /**
   * TODO
   */
  search: async () => {},
  
  /**
   * Updates the `videogamePlatform` element with the given `id`
   *
   * @param {*} id
   * @param {*} data
   */
  update: async (id, data) => {
    try {
      const result = await db.run(
        `UPDATE ${table}
        SET
          name = COALESCE(?, name)
          fullname = COALESCE(?, fullname)
          company = COALESCE(?, company)
        WHERE id = ?`,
        [data.name, data.fullname, data.company, id]
      );
      return result;
    } catch (error) {
      console.error('[ERROR] videogamePlatforms.update: ', error.message);
      throw error;
    }
    // const data = { ...req.body };
    // db.run(
    //   `UPDATE ${table} set 
    //     name = COALESCE(?,name), 
    //     fullname = COALESCE(?,fullname), 
    //     company = COALESCE(?,company) 
    //     WHERE id = ?`,
    //   [data.name, data.fullname, data.company, req.params.id],
    //   function (err, result) {
    //     if (err) {
    //       res.status(400).json({ error: res.message });
    //       return;
    //     }
    //     res.json({
    //       message: 'success',
    //       data: data,
    //       changes: this.changes,
    //     });
    //   }
    // );
  },
};

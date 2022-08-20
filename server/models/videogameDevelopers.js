const db = require("./database");
const table = "videogame_developers";

module.exports = {
  /**
   * Creates a new `videogameDeveloper` element with the given `data`
   * 
   * @param {*} data
   */
  create: async (data) => {
    try {
      const result = await db.run(
        `INSERT INTO ${table} (name) 
        VALUES (?)`,
        [data.name]
      );
      return result;
    } catch (error) {
      console.error('[ERROR] videogameDevelopers.create: ', error.message);
      throw error;
    }
  },

  /**
   * Deletes the `videogameDeveloper` element with the given `id`
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
      console.error('[ERROR] videogameDevelopers.delete: ', error.message);
      throw error;
    }
  },

  /**
   * @param {*} id
   * @returns The `videogameDeveloper` element with the given `id`
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
      console.error('[ERROR] videogameDevelopers.read: ', error.message);
      throw error;
    }
  },

  /**
   * @returns All the `videogameDeveloper` elements
   */
  readAll: async () => {
    try {
      const result = await db.all(
        `SELECT ${table}.*
        FROM ${table}
        --LIMIT ${'offset'}, ${'size'}`
      );
      return result;
    } catch (error) {
      console.error('[ERROR] videogameDevelopers.readAll', error.message);
      throw error;
    }
  },

  /**
   * TODO
   */
  search: async () => {},
  
  /**
   * Updates the `videogameDeveloper` element with the given `id`
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
        WHERE id = ?`,
        [data.name, id]
      );
      return result;
    } catch (error) {
      console.error('[ERROR] videogameDevelopers.update: ', error.message);
      throw error;
    }
  },
};
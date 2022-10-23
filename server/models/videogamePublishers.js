const db = require("./database");
const table = "videogame_publishers";

module.exports = {
  /**
   * Creates a new `videogamePublisher` element with the given `data`
   * 
   * @param {*} data
   */
  create: async (data) => {
    try {
      const { changes, lastID, ...queryResponse } = await db.run(
        `INSERT INTO ${table}
        (name) 
        VALUES (?)`,
        [data.name]
      );
      return {
        id: lastID,
        ...queryResponse,
      };
    } catch (error) {
      console.error('[ERROR] videogamePublishers.create: ', error.message);
      throw error;
    }
  },

  /**
   * Deletes the `videogamePublisher` element with the given `id`
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
      console.error('[ERROR] videogamePublishers.delete: ', error.message);
      throw error;
    }
  },

  /**
   * @param {*} id
   * @returns The `videogamePublisher` element with the given `id`
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
      console.error('[ERROR] videogamePublishers.read: ', error.message);
      throw error;
    }
  },

  /**
   * @returns All the `videogamePublisher` elements
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
      console.error('[ERROR] videogamePublishers.readAll', error.message);
      throw error;
    }
  },

  /**
   * TODO
   */
  search: async () => {},
  
  /**
   * Updates the `videogamePublisher` element with the given `id`
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
      console.error('[ERROR] videogamePublishers.update: ', error.message);
      throw error;
    }
  },
};

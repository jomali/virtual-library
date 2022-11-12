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
      console.error('[ERROR] videogameDevelopers.create: ', error.message);
      throw error;
    }
  },

  /**
   * Deletes the `videogameDeveloper` element with the given `id`
   *
   * @param {number} id
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
   * Deletes all the `videogameDeveloper` elements with the given `ids`.
   * 
   * @param {*} ids - array of ids
   */
  deleteMultiple: async (ids) => {
    try {
      const result = await db.run(
        `DELETE FROM ${table}
        WHERE id IN (${ids.join(", ")})`
      );

      console.log(`[SUCCESS] videogameDevelopers.deleteMultiple: Deleted "${
        ids.join(", ")
      }"`);
      return result;
    } catch (error) {
      console.error(`[ERROR] videogameDevelopers.deleteMultiple: "${
        error.message
      }"`);
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

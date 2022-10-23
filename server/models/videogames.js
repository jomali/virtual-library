const db = require("./database");
const table = "videogames";

module.exports = {
  /**
   * Creates a new `videogame` element with the given `data`
   * 
   * @param {*} data
   */
  create: async (data) => {
    try {
      // Videogame entity:
      const videogameQuery = await db.run(
        `INSERT INTO ${table} 
        (title, synopsis) 
        VALUES (?, ?)`,
        [
          data.title || null,
          data.synopsis || null,
        ]
      );
      const videogame = {
        ...data,
        id: videogameQuery.lastID,
      };

      // Videogame-developer relationship entities:
      await Promise.all(data.developers?.forEach(async (developer) => {
        await db.run(
          `INSERT INTO videogames_developers_relationships
          (videogame_id, videogame_developer_id, tag)
          VALUES (?, ?, ?)`,
          [
            videogame.id,
            developer.id,
            developer.tag || null, 
          ]
        );
      }));

      // Videogame-platform relationship entities:
      for (let i = 0; i < data.platforms?.length; i++) {
        const platform = data.platforms[i];
        await db.run(
          `INSERT INTO videogames_platforms_relationships
          (videogame_id, videogame_platform_id)
          VALUES (?, ?)`,
          [
            videogame.id,
            platform.id
          ]
        );
      }

      // Videogame-publisher relationship entities:
      await Promise.all(data.publishers?.forEach(async (publisher) => {
        await db.run(
          `INSERT INTO videogames_publishers_relationships
          (videogame_id, videogame_publisher_id, tag)
          VALUES (?, ?, ?)`,
          [
            videogame.id,
            publisher.id,
            publisher.tag || null,
          ]
        );
      }));

      // Release date entities:
      // for (let i = 0; i < data.releaseDates?.length; i++) {
      //   const releaseDate = data.releaseDates[i];
      //   await db.run(
      //     `INSERT INTO videogame_releases
      //     (videogame_id, date, tag)
      //     VALUES (?, ?, ?)`,
      //     [
      //       videogame.id,
      //       releaseDate.date || null,
      //       releaseDate.tag || null,
      //     ]
      //   )
      // }

      return videogame;
    } catch (error) {
      console.error('[ERROR] videogames.create: ', error.message);
      throw error;
    }
  },

  /**
   * Deletes the `videogame` element with the given `id`
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
      console.error('[ERROR] videogames.delete: ', error.message);
      throw error;
    }
  },

  /**
   * @param {*} id
   * @returns The `videogame` element with the given `id`
   */
  read: async (id) => {
    try {
      const videogames = await db.all(
        `SELECT ${table}.*
        FROM ${table} 
        WHERE id = ?;`,
        [id]
      );      

      // Developers:
      const developers = await db.all(
        `SELECT developers.*, vidDev.tag
        FROM videogames_developers_relationships AS vidDev
        INNER JOIN videogames 
          ON videogames.id = vidDev.videogame_id
        INNER JOIN videogame_developers AS developers
          ON developers.id = vidDev.videogame_developer_id
        WHERE videogames.id = ${videogames[0].id};`,
      );

      // Platforms:
      const platforms = await db.all(
        `SELECT platforms.*
        FROM videogames_platforms_relationships AS vidPla
        INNER JOIN videogames
          ON videogames.id = vidPla.videogame_id
        INNER JOIN videogame_platforms AS platforms
          ON platforms.id = vidPla.videogame_platform_id
        WHERE videogames.id = ${videogames[0].id};`
      );

      // Publishers:
      const publishers = await db.all(
        `SELECT publishers.*, vidPub.tag
        FROM videogames_publishers_relationships AS vidPub
        INNER JOIN videogames
          ON videogames.id = vidPub.videogame_id
        INNER JOIN videogame_publishers AS publishers
          ON publishers.id = vidPub.videogame_publisher_id
        WHERE videogames.id = ${videogames[0].id};`
      );

      return {
        ...videogames[0],
        developers,
        platforms,
        publishers,
      };
    } catch (error) {
      console.error('[ERROR] videogame.read: ', error);
      throw error;
    }
  },

  /**
   * @returns All the `videogame` elements
   */
  readAll: async () => {
    try {
      const result = [];
      const videogames = await db.all(
        `SELECT ${table}.*
        FROM ${table}
        --LIMIT ${'offset'}, ${'size'}`
      );
      for (let i = 0; i < videogames.length; i++) {
        const videogame = videogames[i];

        // Developers:
        const developers = await db.all(
          `SELECT developers.*, vidDev.tag
          FROM videogames_developers_relationships AS vidDev
          INNER JOIN videogames 
            ON videogames.id = vidDev.videogame_id
          INNER JOIN videogame_developers AS developers
            ON developers.id = vidDev.videogame_developer_id
          WHERE videogames.id = ${videogame.id};`
        );

        // Platforms:
        const platforms = await db.all(
          `SELECT platforms.*
          FROM videogames_platforms_relationships AS vidPla
          INNER JOIN videogames
            ON videogames.id = vidPla.videogame_id
          INNER JOIN videogame_platforms AS platforms
            ON platforms.id = vidPla.videogame_platform_id
          WHERE videogames.id = ${videogame.id};`
        );

        // Publishers:
        const publishers = await db.all(
          `SELECT publishers.*, vidPub.tag
          FROM videogames_publishers_relationships AS vidPub
          INNER JOIN videogames
            ON videogames.id = vidPub.videogame_id
          INNER JOIN videogame_publishers AS publishers
            ON publishers.id = vidPub.videogame_publisher_id
          WHERE videogames.id = ${videogame.id};`
        );

        result.push({
          ...videogame,
          developers,
          platforms,
          publishers,
        });
      }

      return result;
    } catch (error) {
      console.error('[ERROR] videogames.readAll: ', error.message);
      throw error;
    }
  },

  /**
   * TODO
   */
  search: async () => {},
  
  /**
   * Updates the `videogame` element with the given `id`
   *
   * @param {*} id
   * @param {*} data
   */
  update: async (id, data) => {
    try {
      const result = await db.run(
        `UPDATE ${table}
        SET
          title = COALESCE(?, title)
          main_developer_id = COALESCE(?, main_developer_id)
          main_publisher_id = COALESCE(?, main_publisher_id)
          release_date = COALESCE(?, release_date)
        WHERE id = ?`,
        [data.name, id]
      );
      return result;
    } catch (error) {
      console.error('[ERROR] videogames.update: ', error.message);
      throw error;
    }
  },
};

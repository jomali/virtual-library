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
          data.title,
          data.synopsis,
        ]
      );

      const videogame = {
        ...data,
        id: videogameQuery.lastID,
      };

      // Videogame-developer relation entities:
      for (let i = 0; i < videogame.developers.length; i++) {
        const developer = videogame.developers[i]; 
        await db.run(
          `INSERT INTO videogames_developers_relations
          (videogame_id, videogame_developer_id, tag)
          VALUES (?, ?, ?)`,
          [
            videogame.id,
            developer.id,
            developer.tag,
          ]
        );
      }

      // Videogame-platform relation entities:
      for (let i = 0; i < data.platforms.length; i++) {
        const platform = data.platforms[i];
        await db.run(
          `INSERT INTO videogames_platforms_relations
          (videogame_id, videogame_platform_id)
          VALUES (?, ?)`,
          [
            videogame.id,
            platform.id
          ]
        );
      }

      // Videogame-publisher relation entities:
      for (let i = 0; i < videogame.publishers.length; i++) {
        const publisher = videogame.publishers[i];
        await db.run(
          `INSERT INTO videogames_publishers_relations
          (videogame_id, videogame_publisher_id, tag)
          VALUES (?, ?, ?)`,
          [
            videogame.id,
            publisher.id,
            publisher.tag,
          ]
        );
      }

      // Release date entities:
      for (let i = 0; i < data.releaseDates.length; i++) {
        const releaseDate = data.releaseDates[i];
        await db.run(
          `INSERT INTO videogame_releases
          (videogame_id, date, tag)
          VALUES (?, ?, ?)`,
          [
            videogame.id,
            releaseDate.date,
            releaseDate.tag,
          ]
        )
      }
      
      console.log(`[SUCCESS] videogames.create: New element created with id "${
        videogame.id
      }"`);
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
      // Videogame-developer relation entities:
      const videogamesDevelopersRelations = await db.all(
        `SELECT vidDev.*
        FROM videogames_developers_relations as vidDev
        WHERE videogame_developer_id IN (
          SELECT videogame_developer_id
          FROM videogames_developers_relations
          WHERE videogame_id = ${id}
        );`
      );
      const developerCounts = {};
      videogamesDevelopersRelations.forEach((element) =>
      developerCounts[element.videogame_developer_id] =
        (developerCounts[element.videogame_developer_id] || 0) + 1
      );
      await db.run(
        `DELETE FROM videogames_publishers_relations
        WHERE videogame_id = ?`,
        [id]
      );
      await db.run(
        `DELETE FROM videogames_publishers_relations
        WHERE videogame_id IN (${Object.keys(developerCounts)
          .filter((element) => developerCounts[element] === 1)
          .join(", ")
        })`
      );

      // Videogame-developer relation entities:
      const videogamesPublishersRelations = await db.all(
        `SELECT vidPub.*
        FROM videogames_publishers_relations as vidPub
        WHERE videogame_publisher_id IN (
          SELECT videogame_publisher_id
          FROM videogames_publishers_relations
          WHERE videogame_id = ${id}
        );`
      );
      const publisherCounts = {};
      videogamesPublishersRelations.forEach((element) =>
      publisherCounts[element.videogame_publisher_id] =
        (publisherCounts[element.videogame_publisher_id] || 0) + 1
      );
      await db.run(
        `DELETE FROM videogames_publishers_relations
        WHERE videogame_id = ?`,
        [id]
      );
      await db.run(
        `DELETE FROM videogames_publishers_relations
        WHERE videogame_id IN (${Object.keys(publisherCounts)
          .filter((element) => publisherCounts[element] === 1)
          .join(", ")
        })`
      );

      // Videogame entity:
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
        FROM videogames_developers_relations AS vidDev
        INNER JOIN videogames 
          ON videogames.id = vidDev.videogame_id
        INNER JOIN videogame_developers AS developers
          ON developers.id = vidDev.videogame_developer_id
        WHERE videogames.id = ${videogames[0].id};`,
      );

      // Platforms:
      const platforms = await db.all(
        `SELECT platforms.*
        FROM videogames_platforms_relations AS vidPla
        INNER JOIN videogames
          ON videogames.id = vidPla.videogame_id
        INNER JOIN videogame_platforms AS platforms
          ON platforms.id = vidPla.videogame_platform_id
        WHERE videogames.id = ${videogames[0].id};`
      );

      // Publishers:
      const publishers = await db.all(
        `SELECT publishers.*, vidPub.tag
        FROM videogames_publishers_relations AS vidPub
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
          FROM videogames_developers_relations AS vidDev
          INNER JOIN videogames 
            ON videogames.id = vidDev.videogame_id
          INNER JOIN videogame_developers AS developers
            ON developers.id = vidDev.videogame_developer_id
          WHERE videogames.id = ${videogame.id};`
        );

        // Platforms:
        const platforms = await db.all(
          `SELECT platforms.*
          FROM videogames_platforms_relations AS vidPla
          INNER JOIN videogames
            ON videogames.id = vidPla.videogame_id
          INNER JOIN videogame_platforms AS platforms
            ON platforms.id = vidPla.videogame_platform_id
          WHERE videogames.id = ${videogame.id};`
        );

        // Publishers:
        const publishers = await db.all(
          `SELECT publishers.*, vidPub.tag
          FROM videogames_publishers_relations AS vidPub
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

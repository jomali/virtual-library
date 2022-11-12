const db = require("./database");
const videogameDevelopers = require("./videogameDevelopers");
const videogamePublishers = require("./videogamePublishers");

const table = "videogames";

const createVideogameDevelopersAndRelations = async (videogameId, data = []) => {
  const developers = await Promise.all(data.map(
    async (element) => {
      if (element.id) {
        return element;
      } else {
        const newDeveloper = await videogameDevelopers.create(element);
        return { ...element, ...newDeveloper };
      }
    }
  ));

  for (let i = 0; i < developers.length; i++) {
    const developer = developers[i]; 
    await db.run(
      `INSERT INTO videogames_developers_relations
      (videogame_id, videogame_developer_id, tag)
      VALUES (?, ?, ?)`,
      [
        videogameId,
        developer.id,
        developer.tag,
      ]
    );
  }

  return developers;
}

const createVideogamePublishersAndRelations = async (videogameId, data = []) => {
  const publishers = await Promise.all(data.map(
    async (element) => {
      if (element.id) {
        return element;
      } else {
        const newPublisher = await videogamePublishers.create(element);
        return { ...element, ...newPublisher };
      }
    }
 ));

  for (let i = 0; i < publishers.length; i++) {
    const publisher = publishers[i];
    await db.run(
      `INSERT INTO videogames_publishers_relations
      (videogame_id, videogame_publisher_id, tag)
      VALUES (?, ?, ?)`,
      [
        videogameId,
        publisher.id,
        publisher.tag,
      ]
    );
  }

  return publishers;
}

const removeDetachedDevelopers = async (videogameId) => {
  const videogamesDevelopersRelations = await db.all(
    `SELECT vidDev.*
    FROM videogames_developers_relations as vidDev
    WHERE videogame_developer_id IN (
      SELECT videogame_developer_id
      FROM videogames_developers_relations
      WHERE videogame_id = ${videogameId}
    );`
  );
  await db.run(
    `DELETE FROM videogames_developers_relations
    WHERE videogame_id = ?`,
    [videogameId]
  );
  const developerCounts = {};
  videogamesDevelopersRelations.forEach((element) =>
  developerCounts[element.videogame_developer_id] =
    (developerCounts[element.videogame_developer_id] || 0) + 1
  );
  const developersToDelete = Object.keys(developerCounts)
    .filter((element) => developerCounts[element] === 1);
  if (developersToDelete.length) {
    await videogameDevelopers.deleteMultiple(developersToDelete);
  }
  return developersToDelete;
};

const removeDetachedPublishers = async (videogameId) => {
  const videogamesPublishersRelations = await db.all(
    `SELECT vidPub.*
    FROM videogames_publishers_relations as vidPub
    WHERE videogame_publisher_id IN (
      SELECT videogame_publisher_id
      FROM videogames_publishers_relations
      WHERE videogame_id = ${videogameId}
    );`
  );
  await db.run(
    `DELETE FROM videogames_publishers_relations
    WHERE videogame_id = ?`,
    [videogameId]
  );
  const publisherCounts = {};
  videogamesPublishersRelations.forEach((element) =>
  publisherCounts[element.videogame_publisher_id] =
    (publisherCounts[element.videogame_publisher_id] || 0) + 1
  );
  const publishersToDelete = Object.keys(publisherCounts)
  .filter((element) => publisherCounts[element] === 1);
  if (publishersToDelete.length) {
    await videogamePublishers.deleteMultiple(publishersToDelete);
  }
  return publishersToDelete;
};

const removePlatformRelations = async (videogameId) => {
  await db.run(
    `DELETE FROM videogames_platforms_relations
    WHERE videogame_id = ?`,
    [videogameId]
  );
}

const removeReleaseDates = async (videogameId) => {
  await db.run(
    `DELETE FROM videogame_releases
    WHERE videogame_id = ?`,
    [videogameId]
  );
}

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

      // Developer and videogame-developer relation entities:
      const developers = await createVideogameDevelopersAndRelations(
        videogameQuery.lastID,
        data.developers
      );

      // Videogame-platform relation entities:
      for (let i = 0; i < data.platforms.length; i++) {
        const platform = data.platforms[i];
        await db.run(
          `INSERT INTO videogames_platforms_relations
          (videogame_id, videogame_platform_id)
          VALUES (?, ?)`,
          [
            videogameQuery.lastID,
            platform.id
          ]
        );
      }

      // Publisher and videogame-publisher relation entities:
      const publishers = await createVideogamePublishersAndRelations(
        videogameQuery.lastID,
        data.publishers
      );

      // Release date entities:
      for (let i = 0; i < data.releaseDates.length; i++) {
        const releaseDate = data.releaseDates[i];
        await db.run(
          `INSERT INTO videogame_releases
          (videogame_id, date, tag)
          VALUES (?, ?, ?)`,
          [
            videogameQuery.lastID,
            releaseDate.date,
            releaseDate.tag,
          ]
        )
      }
      
      const result = {
        ...data,
        id: videogameQuery.lastID,
        developers: developers,
        publishers: publishers,
      }
      console.log(`[SUCCESS] videogames.create: New element created with id "${
        result.id
      }"`);
      return result;
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
      await removeDetachedDevelopers(id);
      await removeDetachedPublishers(id);
      await removePlatformRelations(id);
      await removeReleaseDates(id);

      const result = await db.run(
        `DELETE FROM ${table} 
        WHERE id = ?`,
        [id]
      );
      
      console.log(`[SUCCESS] videogames.delete: Deleted "${id}"`);
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
      // Videogame entity
      await db.run(
        `UPDATE ${table}
        SET
          title = COALESCE(?, title),
          synopsis = COALESCE(?, synopsis)
        WHERE id = ?`,
        [
          data.title,
          data.synopsis,
          id
        ]
      );

      // Videogame-developer relation entities:
      const removedDevelopers = await removeDetachedDevelopers(id);
      const developers = await createVideogameDevelopersAndRelations(
        id,
        data.developers.map((element) => ({
          ...element,
          id: removedDevelopers.includes(`${element.id}`) ? null : element.id
        }))
      );

      // Videogame-platform relation entities:
      await removePlatformRelations(id);
      for (let i = 0; i < data.platforms.length; i++) {
        const platform = data.platforms[i];
        await db.run(
          `INSERT INTO videogames_platforms_relations
          (videogame_id, videogame_platform_id)
          VALUES (?, ?)`,
          [
            id,
            platform.id
          ]
        );
      }

      // Videogame-publisher relation entities:
      const removedPublishers = await removeDetachedPublishers(id);
      const publishers = await createVideogamePublishersAndRelations(
        id,
        data.publishers.map((element) => ({
          ...element,
          id: removedPublishers.includes(`${element.id}`) ? null : element.id
        }))
      );

      // Release date entities:
      await removeReleaseDates(id);
      for (let i = 0; i < data.releaseDates.length; i++) {
        const releaseDate = data.releaseDates[i];
        await db.run(
          `INSERT INTO videogame_releases
          (videogame_id, date, tag)
          VALUES (?, ?, ?)`,
          [
            id,
            releaseDate.date,
            releaseDate.tag,
          ]
        )
      }
      
      const result = {
        ...data,
        developers: developers,
        publishers: publishers
      };
      console.log(`[SUCCESS] videogames.update: Updated "${
        result.id
      }"`);
      return result;
    } catch (error) {
      console.error('[ERROR] videogames.update: ', error);
      throw error;
    }
  },
};

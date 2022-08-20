const videogamePublishers = require('../models/videogamePublishers');

module.exports = {
  /**
   * TODO
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  create: async (req, res, next) => {
    try {
      const { name } = req.body;
      // Validation step:
      const errors = [];
      if (Boolean(name)) {
        errors.push('The `name` must be defined');
      }
      if (errors.length) {
        res.status(422).json({
          error: errors.join(',')
        });
        return;
      }

      // Tries to create a new element
      const data = await videogamePublishers.create({
        name
      });
      res.status(200).json({
        data,
        id: this.lastID,
        message: 'success',
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  /**
   * TODO
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      await videogamePublishers.delete(id);
      res.status(200).json({
        changes: this.changes,
        message: 'deleted',
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  /**
   * TODO
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  read: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await videogamePublishers.read(id);

      res.status(200).json({
        data,
        message: 'success',
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  /**
   * TODO
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  readAll: async (req, res, next) => {
    try {
      const data = await videogamePublishers.readAll();
      res.status(200).json({
        data: data,
        message: 'success',
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  /**
   * TODO
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  update: async (req, res, next) => {
    try {
      const { name } = req.body;
      const { id } = req.params;

      // Validation step:
      const errors = [];
      if (Boolean(name)) {
        errors.push('The `name` must be defined');
      }
      if (errors.length) {
        res.status(422).json({
          error: errors.join(',')
        });
        return;
      }

      // Tries to update the element
      const data = await videogamePublishers.update(id, {
        name
      });
      res.status(200).json({
        data,
        id: this.lastID,
        message: 'success',
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
};

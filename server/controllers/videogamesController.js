const videogames = require("../models/videogames");

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
      // Validation step:
      // TODO

      // Creation:
      const data = await videogames.create(req.body);
      console.log("data", data);

      // 201 Created
      res.status(201).json({
        data,
        id: this.lastId,
        message: 'success',
      })
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
      await videogames.delete(id);

      res.status(204).json({
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
      const data = await videogames.read(id);

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
      const data = await videogames.readAll();
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
    // const id = req.params.id;
    // const body = { ...req.body };
    // videogames.update(id, body, (error, data) => {
    //   if (error) {
    //     res.status(400).json({ error: error.message });
    //     return;
    //   }
    //   res.json({
    //     message: "success",
    //     data: data,
    //     changes: this.changes,
    //   });
    // });
  },
};

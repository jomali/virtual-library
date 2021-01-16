const videogamePlatforms = require('../models/videogamePlatforms');

module.exports = {
  create: (req, res, next) => videogamePlatforms.create(req, res, next),
  delete: (req, res, next) => videogamePlatforms.delete(req, res, next),
  read: (req, res, next) => videogamePlatforms.read(req, res, next),
  readAll: (req, res, next) => videogamePlatforms.readAll(req, res, next),
  update: (req, res, next) => videogamePlatforms.update(req, res, next),
};

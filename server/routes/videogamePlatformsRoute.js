const express = require('express');
const videogamePlatformsController = require('../controllers/videogamePlatformsController');
const router = express.Router();

router.delete('/:id', videogamePlatformsController.delete);
router.get('/', videogamePlatformsController.readAll);
router.get('/:id', videogamePlatformsController.read);
router.post('/', videogamePlatformsController.create);
router.post('/:id', videogamePlatformsController.update);

module.exports = router;

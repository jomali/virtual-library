const express = require('express');
const videogamePublishersController = require('../controllers/videogamePublishersController');
const router = express.Router();

router.delete('/:id', videogamePublishersController.delete);
router.get('/', videogamePublishersController.readAll);
router.get('/:id', videogamePublishersController.read);
router.post('/', videogamePublishersController.create);
router.post('/:id', videogamePublishersController.update);

module.exports = router;

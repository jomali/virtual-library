const express = require('express');
const videogameDevelopersController = require('../controllers/videogameDevelopersController');
const router = express.Router();

router.delete('/:id', videogameDevelopersController.delete);
router.get('/', videogameDevelopersController.readAll);
router.get('/:id', videogameDevelopersController.read);
router.post('/', videogameDevelopersController.create);
router.post('/:id', videogameDevelopersController.update);

module.exports = router;

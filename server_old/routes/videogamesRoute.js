
const express = require('express');
const videogamesController = require('../controllers/videogamesController');
const router = express.Router();

router.delete('/:id', videogamesController.delete);
router.get('/', videogamesController.readAll);
router.get('/:id', videogamesController.read);
router.post('/', videogamesController.create);
router.put('/:id', videogamesController.update);

module.exports = router;

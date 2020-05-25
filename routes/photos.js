const express = require('express');
const router = express.Router();
const {index, show} = require('../controllers/photo_controller');

//Get all photos
router.get('/', index);

//Get photo by id
router.get('/:photoId', show);

module.exports = router;

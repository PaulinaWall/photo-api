const express = require('express');
const router = express.Router();
const {index, show} = require('../controllers/album_controller');

//Get all albums
router.get('/', index);

//Get one album by id
router.get('/:albumId', show);

module.exports = router;

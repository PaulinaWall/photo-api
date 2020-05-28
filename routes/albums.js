const express = require('express');
const router = express.Router();
const {index, show, store} = require('../controllers/album_controller');
const {addPhoto} = require('../controllers/photo_controller');
const album_validationRules = require('../validationRules/album_rules');

//Get all albums
router.get('/', index);

//Get one album by id
router.get('/:albumId', show);

//Store new album
router.post('/', album_validationRules.createRules, store);

router.post('/album', album_validationRules.addPhotoToAlbumRules, addPhoto);
module.exports = router;

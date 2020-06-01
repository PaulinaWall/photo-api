const express = require('express');
const router = express.Router();
const {index, show, store, addPhoto, destroy} = require('../controllers/album_controller');
const album_validationRules = require('../validationRules/album_rules');

//Get all albums
router.get('/', index);

//Get one album by id
router.get('/:albumId', show);

//Store new album
router.post('/', album_validationRules.createRules, store);

//Store photos to album
router.post('/:albumId/photos', [album_validationRules.addPhotoToAlbumRules], addPhoto);

//delete album
router.delete('/:albumId', destroy);

module.exports = router;

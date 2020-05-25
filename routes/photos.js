const express = require('express');
const router = express.Router();
const {index, show, store} = require('../controllers/photo_controller');
const photo_validationRules = require('../validationRules/photo_rules');

//Get all photos
router.get('/', index);

//Get photo by id
router.get('/:photoId', show);

//Post photo to database
router.post('/', photo_validationRules.createRules, store);

module.exports = router;

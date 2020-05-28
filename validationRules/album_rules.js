const { body } = require('express-validator');
const models = require('../models');

const createRules = [
	body('title').isLength({ min: 3 }),
];

const addPhotoToAlbumRules = [
	body('photo_id').custom(value => {
		 return models.Photo.fetchById(value);
	})
];

module.exports = {
	createRules,
	addPhotoToAlbumRules,
}

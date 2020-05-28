const { body } = require('express-validator');
const models = require('../models');

const createRules = [
	body('title').isLength({ min: 3 }),
	body('user_id').custom(value => {
		return models.User.fetchById(value);
   })
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

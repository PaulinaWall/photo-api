const { body } = require('express-validator');
const models = require('../models');

const createRules = [
	body('title').isLength({ min: 3 }),
];

const addPhotoToAlbumValidator = async values => {
	if (!values.every(Number.isInteger)) {
		return Promise.reject('Invalid value in array.');
	}

	for (let i = 0; i < values.length; i++) {
		const photo = await models.Photo.fetchById(values[i]);

		if (!photo) {
			return Promise.reject(`Category ${values[i]} does not exist.`);
		}
		return photo;
	}
};

const addPhotoToAlbumRules = [
	body('photo_id').isArray().custom(addPhotoToAlbumValidator)
];

module.exports = {
	createRules,
	addPhotoToAlbumRules,
}

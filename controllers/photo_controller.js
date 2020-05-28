const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

const index = async (req, res) => {
	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	await req.user.load('photos');
	const photos = req.user.related('photos');

	res.send({
		status: 'success',
		data: {
			photos,
		},
	});
}

const show = async (req, res) => {
	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	const photos = await new models.Photo({id: req.params.photoId}).fetch();

	if(photos.attributes.user_id === req.user.attributes.id){
		res.send({
			status: 'success',
			data: {
				photos
			},
		});
	}else{
		res.status(403).send({
			status: 'fail',
			data: 'Not authorized.',
		});
	}
}

const store = async (req, res) => {
	const error = validationResult(req);
	if(!error.isEmpty()){
		res.status(422).send({
			status: 'fail',
			data: error.toArray()
		});
		return;
	}

	const validData = matchedData(req);
	/*
	try {
		validData.password = await bcrypt.hash(validData.password, models.User.hashSaltRounds); // hash.salt is returned from bcrypt.hash()

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
		throw error;
	}
*/

	try{
		const photo = await new models.Photo(validData).save();
		res.send({
			status: 'success',
			data: {
				photo,
			},
		});
	} catch(error) {
		res.status(500).send({
			status: 'error',
			message: 'An error was thrown when trying to store new photo to database.',
		});
		throw error;
	}
}


const addPhoto = async (req, res) => {
	try {
		const photo = await models.Photo.fetchById(req.body.photo_id);

		const album = await models.Album.fetchById(req.body.album_id);

		const result = await album.photos().atach(photo);

		res.status(201).send({
			status: 'success',
			data: result,
		})

	} catch (err) {
		res.sendStatus(404);
		throw err;
	}
}

module.exports = {
	index,
	show,
	store,
	addPhoto,
}

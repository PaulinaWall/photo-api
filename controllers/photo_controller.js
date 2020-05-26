const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

const index = async (req, res) => {
	const allThePhotos = await models.Photo.fetchAll();

  	res.send({
		status: 'success',
		data: {
			photos: allThePhotos,
		}
	});
}

const show = async (req, res) => {
	const photo = await new models.Photo({id: req.params.photoId}).fetch({withRelated: 'albums'});

	res.send({
		status: 'success',
		data: {
			photo: photo,
		}
	});
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

module.exports = {
	index,
	show,
	store,
}

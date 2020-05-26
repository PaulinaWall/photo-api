const models = require('../models');

const { matchedData, validationResult } = require('express-validator');

const index = async (req, res) => {
	const allTheAlbums = await models.Album.fetchAll();

  	res.send({
		status: 'success',
		data: {
			albums: allTheAlbums,
		}
	});
}

const show = async (req, res) => {
	const album = await new models.Album({id: req.params.albumId}).fetch({withRelated: 'photos'});

	res.send({
		status: 'success',
		data: {
			album: album,
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
		const album = await new models.Album(validData).save();
		res.send({
			status: 'success',
			data: {
				album: album,
			},
		});
	} catch(error) {
		res.status(500).send({
			status: 'error',
			message: 'An error was thrown when trying to store new album to database.',
		});
		throw error;
	}
}

module.exports = {
	index,
	show,
	store,
}

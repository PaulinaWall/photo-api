const bcrypt = require('bcrypt');
const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

//Get authenticated user

const index = async (req, res) => {
	if(!req.user){
		res.status(401).send({
			status: 'fail',
			message: 'Authorization required.',
		});
		return;
	}

	// send (parts of) user profile to requester
	res.send({
		status: 'success',
		data: {
			user: req.user,
		}
	});
}

const store = async (req, res) => {

	const errors = validationResult(req);

	if(!errors.isEmpty()){
		res.status(422).send({
			status: 'fail',
			data: errors.toArray()
		});
		return;
	}

	const validData = matchedData(req);

	/*
	// generate a hash of `validData.password`
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
		const user = await new models.User(validData).save();
		res.send({
			status: 'success',
			data: {
				user,
			},
		});
	} catch(error) {
		res.status(500).send({
			status: 'error',
			message: 'Exeption thrown in database when creating a new user',
		});
		throw error;
	}
}


const addPhoto = async (req, res) => {
	try {
		const photo = await models.Photo.fetchById(req.body.photo_id);

		const album = await models.Album.fetchById(req.body.album.data.id);

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
	store,
	addPhoto,
}

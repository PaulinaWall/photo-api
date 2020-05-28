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

	await req.user.load('albums');
	const albums = req.user.related('albums');

	res.send({
		status: 'success',
		data: {
			albums,
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

	const albums = await new models.Album({id: req.params.albumId}).fetch({withRelated: 'photos'});

	if(albums.attributes.user_id === req.user.attributes.id){
		res.send({
			status: 'success',
			data: {
				albums
			},
		});
	}else{
		res.status(403).send({
			status: 'fail',
			data: 'Not authorized.',
		});
	}
}
/*
const store = async (req, res) => {
	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Add album to user:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	try {
		// 1. get book to attach
		const album = await models.Album.fetchById(req.body.album_id);

		// 2. attach book to user (create a row in books_users for this book and user)

		// 2.1. fetch User model
		const user = await models.User.fetchById(req.user.data.id);

		// 2.2. on User model, call attach() on the books() relation and pass the Book model
		const result = await user.albums().attach(album);

		// 2.3. Profit?
		res.status(201).send({
			status: 'success',
			data: result,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to add book to profile.',
		});
		throw error;
	}
}
*/

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

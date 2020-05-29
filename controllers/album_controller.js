const models = require('../models');

const { matchedData, validationResult } = require('express-validator');

const index = async (req, res) => {
	let user = null;
	try {
		user = await models.User.fetchById(req.user.data.id, { withRelated: 'albums' });
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	const albums = user.related('albums');
	console.log('albums', albums);
	res.send({
		status: 'success',
		data: {
			albums,
		},
	});
}

const show = async (req, res) => {
	let user = null;
	try {
		user = await models.User.fetchById(req.user.data.id, { withRelated: 'albums' });
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	const albums = await new models.Album({id: req.params.albumId}).fetch({withRelated: 'photos'});

	if(albums.attributes.user_id === req.user.data.id){
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

const store = async (req, res) => {
	let user = null;
	try {
		user = await models.User.fetchById(req.user.data.id, { withRelated: 'photos' });
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	const error = validationResult(req);
	if(!error.isEmpty()){
		res.status(422).send({
			status: 'fail',
			data: error.array()
		});
		return;
	}

	const validData = matchedData(req);

	try{
		const album = await new models.Album(validData).save({user_id: req.user.data.id});

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

const addPhoto = async (req, res) => {
	const error = validationResult(req);
	if(!error.isEmpty()){
		res.status(422).send({
			status: 'fail',
			data: error.array()
		});
		return;
	}

	try {
		const photo = await models.Photo.fetchById(req.body.photo_id);

		const album = await models.Album.fetchById(req.params.albumId);

		const result = await album.photos().attach(photo);

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

const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

const index = async (req, res) => {
	let user = null;
	try {
		user = await models.User.fetchById(req.user.data.id, { withRelated: 'photos' });
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	const photos = user.related('photos');

	res.send({
		status: 'success',
		data: {
			photos,
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

	const photos = await new models.Photo({id: req.params.photoId}).fetch({withRelated: 'albums'});

	if(photos.attributes.user_id === req.user.data.id){
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
	let user = null;
	try {
		user = await models.User.fetchById(req.user.data.id, { withRelated: 'albums' });
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
		const photo = await new models.Photo(validData).save({user_id: req.user.data.id});
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

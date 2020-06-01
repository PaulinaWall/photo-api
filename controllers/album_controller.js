const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

const addPhoto = async (req, res) => {
    let album = null;
    try {
		album = await models.Album.fetchById(req.params.albumId);
    } catch {
        res.status(404).send({
            status: "fail",
            message: `Album with ID ${req.params.albumId} was not found.`,
        });
        return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({
            status: 'fail',
            data: errors.array(),
        });
        return;
    }
	const validData = matchedData(req);
    try {
        if (validData.photo_id) {
            await album.photos().attach(validData.photo_id);
            res.status(200).send({
                status: "success",
                data: null,
            });
            return;
        }
    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: "Exeption thrown when trying to add photos to the album.",
        });
        throw error;
    }
}

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

const destroy = async (req, res) => {
	try{
		const album = await new models.Album({
			id: req.params.albumId,
			user_id: req.user.data.id
		})
		.fetch({ withRelated: 'photos' });

		album.photos().detach();
		album.destroy().then();

		res.send({
			status: 'success',
			message: 'Success deleting album from database!'
		})
	} catch(error) {
		res.status(500).send({
			status: 'error',
			message: 'An error was thrown when trying to delete photo from database.',
		});
		throw error;
	}

}

module.exports = {
	addPhoto,
	index,
	show,
	store,
	destroy,
}

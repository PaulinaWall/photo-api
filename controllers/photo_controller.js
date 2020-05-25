const models = require('../models');

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
	const photo = await new models.Photo({id: req.params.photoId}).fetch();

	res.send({
		status: 'success',
		data: {
			photo: photo,
		}
	});
}

module.exports = {
	index,
	show,
}

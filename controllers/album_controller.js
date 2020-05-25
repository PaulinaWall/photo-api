const models = require('../models');

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
	const album = await new models.Album({id: req.params.albumId}).fetch();

	res.send({
		status: 'success',
		data: {
			album: album,
		}
	});
}

module.exports = {
	index,
	show,
}

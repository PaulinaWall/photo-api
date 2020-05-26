const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER || 'photo-app',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'photo-app',
	}
});

//b6be181be9a014 -- DB_USER
//ef1e1789 -- DB_PASSWORD
//eu-cdbr-west-03.cleardb.net -- DB_HOST
//heroku_4de687699a60598 -- DB_NAME

const bookshelf = require('bookshelf')(knex);

const Album = require('./Album')(bookshelf);

const Photo = require('./Photo')(bookshelf);

const User = require('./User')(bookshelf);

module.exports = {
	bookshelf,
	Album,
	Photo,
	User,
};

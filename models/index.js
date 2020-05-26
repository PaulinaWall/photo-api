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

const bookshelf = require('bookshelf')(knex);

const Album = require('./Album')(bookshelf);

const Photo = require('./Photo')(bookshelf);

module.exports = {
	bookshelf,
	Album,
	Photo,
};
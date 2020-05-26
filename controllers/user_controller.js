const bcrypt = require('bcrypt');
const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

const getAuthenticatedUser = async (req, res) => {
	// retrieve authenticated user's profile
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id);
	} catch (err) {
		res.sendStatus(404);
		throw err;
	}

	// send (parts of) user profile to requester
	res.send({
		status: 'success',
		data: {
			user: {
				username: user.get('username'),
				first_name: user.get('first_name'),
				last_name: user.get('last_name'),
			},
		}
	});
}

const index = async (req, res) => {
	const allTheUsers = await models.User.fetchAll();

  	res.send({
		status: 'success',
		data: {
			users: allTheUsers,
		}
	});
}

const show = async (req, res) => {
	const user = await new models.User({id: req.params.userId}).fetch({ withRelated: ['photos', 'albums']});

	res.send({
		status: 'success',
		data: {
			user: user,
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

module.exports = {
	getAuthenticatedUser,
	index,
	show,
	store,
}

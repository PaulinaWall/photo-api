const bcrypt = require('bcrypt');
const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

//Get authenticated user
const getUser = async (req, res) => {
	// retrieve authenticated user's profile
	let user = null;
	try {
		user = await models.User.fetchById(req.user.data.id);
	} catch (err) {
		res.sendStatus(404);
		throw err;
	}
console.log('user', user);
	res.send({
		status: 'success',
		data: {
			user: {
				email: user.get('email'),
				first_name: user.get('first_name'),
				last_name: user.get('last_name'),
			},
		}
	});
}

const register = async (req, res) => {

	const errors = validationResult(req);

	if(!errors.isEmpty()){
		res.status(422).send({
			status: 'fail',
			data: errors.array()
		});
		return;
	}

	const validData = matchedData(req);

	try {
		validData.password = await bcrypt.hash(validData.password, models.User.hashSaltRounds);

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
		throw error;
	}

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
	getUser,
	register
}

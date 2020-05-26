const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

const index = async (req, res) => {
	const all_users = await models.User.fetchAll();

  	res.send({
		status: 'success',
		data: {
			users: all_users,
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
	index,
	show,
	store,
}

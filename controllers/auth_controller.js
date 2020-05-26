const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async (req, res) => {
	const user = await User.login(req.body.username, req.body.password);
	if (!user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	// construct jwt payload
	const payload = {
		data: {
			id: user.get('id'),
			username: user.get('username'),
			is_admin: user.get('is_admin'),
		},
	};


	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1h' });

	const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '1w' });

	res.send({
		status: 'success',
		data: {
			access_token,
			refresh_token,
		},
	});
}

const refresh = (req, res) => {
	const token = getTokenFromHeaders(req);
	if (!token) {
		res.status(401).send({
			status: 'fail',
			data: 'No token found in request headers.'
		});
		return;
	}

	try {
		const { data } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

		const payload = {
			data,
		}

		const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1h' });

		res.send({
			status: 'success',
			data: {
				access_token,
			}
		})

	} catch (err) {
		res.status(403).send({
			status: 'fail',
			data: 'Invalid token.',
		});
		return;
	}
}

const register = async (req, res) => {
	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Create user request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	// generate a hash of `validData.password`
	try {
		validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds); // hash.salt is returned from bcrypt.hash()

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
		throw error;
	}

	try {
		const user = await new User(validData).save();
		console.log("Created new user successfully:", user);

		res.status(201).send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user.',
		});
		throw error;
	}
}
/**
 * Get token from HTTP headers
 */
const getTokenFromHeaders = (req) => {
	// Check that we have Authorization header
	if (!req.headers.authorization) {
		return false;
	}

	// Split authorization header into its pieces
	// "Bearer eyJhbGciOi[..]JtbLU"
	const [authType, token] = req.headers.authorization.split(' ');

	// Check that the Authorization type is Bearer
	if (authType.toLowerCase() !== "bearer") {
		return false;
	}

	return token;
}

module.exports = {
	login,
	refresh,
	register,
	getTokenFromHeaders,
}
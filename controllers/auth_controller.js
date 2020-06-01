const jwt = require('jsonwebtoken');
const {User} = require('../models');

const login = async (req, res) => {
	const user = await User.login(req.body.email, req.body.password);

	if (!user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	const payload = {
		data: {
			id: user.get('id'),
			email: user.get('email'),
		},
	};

	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

	res.send({
		status: 'success',
		data: {
			access_token,
		},
	});
}

const getTokenFromHeaders = (req) => {
	if (!req.headers.authorization) {
		return false;
	}

	const [authType, token] = req.headers.authorization.split(' ');

	if (authType.toLowerCase() !== "bearer") {
		return false;
	}
	return token;
}

module.exports = {
	login,
	getTokenFromHeaders,
}

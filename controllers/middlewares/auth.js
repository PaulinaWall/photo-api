const jwt = require('jsonwebtoken');
const { getTokenFromHeaders } = require('../login_controller');
const { User } = require('../../models');

const basic = async (req, res, next) => {
	if (!req.headers.authorization) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization required',
		});
		return;
	}

	const [authSchema, base64Payload] = req.headers.authorization.split(' ');

	if (authSchema.toLowerCase() !== "basic") {
		next();
	}

	const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');

	const [email, password] = decodedPayload.split(':');

	const user = await User.login(email, password);
	if (!user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
		return;
	}
	req.user = user;
	next();
}

const validateJwtToken = (req, res, next) => {
	const token = getTokenFromHeaders(req);
	if (!token) {
		res.status(401).send({
			status: 'fail',
			data: 'No token found in request headers.',
		});
		return;
	}

	let payload = null;
	try {
		payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (err) {
		res.status(403).send({
			status: 'fail',
			data: 'Authentication Failed.',
		});
		throw err;
	}
	req.user = payload;
	next();
}

module.exports = {
	basic,
	validateJwtToken,
}

const { body } = require('express-validator');

const createRules = [
	body('title').isLength({ min: 3 }),
];

module.exports = {
	createRules,
}

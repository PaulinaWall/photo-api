const { body } = require('express-validator');

const createRules = [
	body('title').isLength({ min: 3 }),
	body('url').isLength({ min: 3 }),
	body('comment').optional(),
];

module.exports = {
	createRules,
}

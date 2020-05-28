const { body } = require('express-validator');
const models = require('../models');

const createRules = [
	body('title').isLength({ min: 3 }),
	body('url').isLength({ min: 3 }),
	body('comment').optional(),
];


module.exports = {
	createRules,
}

const express = require('express');
const router = express.Router();
const {getAuthenticatedUser, show, store} = require('../controllers/user_controller');
const userValidationRules = require('../validationRules/user_rules');

//Get all users
router.get('/', getAuthenticatedUser);

//Get one specific user by id
router.get('/:userId', show);

//Store new user to database
router.post('/', userValidationRules.createRules, store);

module.exports = router;

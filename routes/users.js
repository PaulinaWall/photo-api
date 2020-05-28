const express = require('express');
const router = express.Router();
const {index, store} = require('../controllers/user_controller');
const userValidationRules = require('../validationRules/user_rules');

//Get authenticated user
router.get('/', index);

//Store new user to database
router.post('/', userValidationRules.createRules, store);

module.exports = router;

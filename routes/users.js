const express = require('express');
const router = express.Router();
const {getUser} = require('../controllers/user_controller');

//Get authenticated user
router.get('/', getUser);

module.exports = router;

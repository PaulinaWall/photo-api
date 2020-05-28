const express = require('express');
const router = express.Router();
const {index} = require('../controllers/user_controller');

//Get authenticated user
router.get('/', index);

module.exports = router;

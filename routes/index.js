const express = require('express');
const router = express.Router();

const auth = require('../controllers/middlewares/auth');
const user_rules = require('../validationRules/user_rules');
const user_controller = require('../controllers/user_controller');
const auth_controller = require('../controllers/auth_controller');

/* GET / */
router.get('/', (req, res) => {
  res.send({ status: 'Welcome to my first REST API!' });
});

//Register new user
router.post('/register', [user_rules.createRules], user_controller.register);

//login user
router.post('/login', auth_controller.login);

router.use('/users', [auth.validateJwtToken], require('./users'));
router.use('/albums', [auth.validateJwtToken], require('./albums'));
router.use('/photos', [auth.validateJwtToken], require('./photos'));



module.exports = router;

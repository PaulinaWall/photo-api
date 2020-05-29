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

router.post('/login', auth_controller.login);

router.post('/register', [user_rules.createRules], user_controller.store);

router.use('/albums', [auth.basic], require('./albums'));
router.use('/photos', [auth.basic], require('./photos'));

router.use('/users', [auth.basic], require('./users'));

module.exports = router;

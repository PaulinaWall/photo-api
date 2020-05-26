const express = require('express');
const router = express.Router();
const {validateJwtToken} = require('../controllers/middlewares/auth');

const login_controller = require('../controllers/login_controller');

/* GET / */
router.get('/', (req, res) => {
  res.send({ status: 'This is my first REST API!' });
});

router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));

router.post('/register', login_controller.register);

router.use('/users', [validateJwtToken], require('./users'));

module.exports = router;

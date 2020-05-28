const express = require('express');
const router = express.Router();

const auth = require('../controllers/middlewares/auth');
/* GET / */
router.get('/', (req, res) => {
  res.send({ status: 'Welcome to my first REST API!' });
});

router.use('/albums', [auth.basic], require('./albums'));
router.use('/photos', [auth.basic], require('./photos'));

router.use('/users', [auth.basic], require('./users'));

module.exports = router;

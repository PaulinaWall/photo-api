const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res) => {
  res.send({ status: 'This is my first REST API!' });
});

router.use(require('../controllers/middlewares/auth').basic);

router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));

router.use('/users', require('./users'));

module.exports = router;

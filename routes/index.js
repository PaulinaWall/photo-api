const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/auth_controller');

/* GET / */
router.get('/', (req, res) => {
  res.send({ status: 'success' });
});

router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));

router.post('/register', auth_controller.register);


module.exports = router;

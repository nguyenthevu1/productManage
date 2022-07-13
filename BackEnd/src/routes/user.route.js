const router = require('express').Router();

const { register, login } = require('../controller/User.controller');

router.post('/login', login);
router.post('/register', register);

module.exports = router;

const express = require('express');
const { signUp, logIn } = require('./controller');

const router = express.Router();

router.post('/sign-up', signUp).post('/log-in', logIn);

module.exports = router;

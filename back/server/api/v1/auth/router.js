const express = require('express');
const { me } = require('./middlewares');
const { signUp, logIn, getProfile } = require('./controller');
const { editProfile } = require('../users/controller');

const router = express.Router();

router.post('/sign-up', signUp).post('/log-in', logIn);

router.route('/me').all(me).get(getProfile).patch(editProfile);

module.exports = router;

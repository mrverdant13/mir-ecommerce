const express = require('express');
const { me } = require('./middlewares');
const { signUp, logIn, getProfile } = require('./controller');

const router = express.Router();

router
  .post('/sign-up', signUp)
  .post('/log-in', logIn)
  .get('/me', me, getProfile);

module.exports = router;

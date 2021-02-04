const { Router } = require('express');
const authRouter = Router();

// actions
const {
  login,
  logout
} = require('../actions/actions.auth');

// middleware
const checkMethod = require('../middleware/checkMethod');
const handleQuery = require('../middleware/handleQuery');

// router
authRouter
  .route('/')
  .get(checkMethod('GET'), logout)
  .post(checkMethod('POST'), login);

module.exports = {
  authRouter,
}
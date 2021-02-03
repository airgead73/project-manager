const { Router } = require('express');
const usersRouter = Router();

// models
const User = require('../models/User');

// actions
const {
  create,
  read,
  read_one,
  update,
  delete_one,
  delete_all
} = require('../actions/actions.users');

// middleware
const checkMethod = require('../middleware/checkMethod');
const handleQuery = require('../middleware/handleQuery');

// router
usersRouter
  .route('/')
  .get(checkMethod('GET'), handleQuery(User), read)
  .post(checkMethod('POST'), create)
  .delete(checkMethod('DELETE'), delete_all);

usersRouter
  .route('/:userID')
  .get(checkMethod('GET'), read_one)
  .put(checkMethod('PUT'), update)
  .delete(checkMethod('DELETE'), delete_one);

module.exports = {
  usersRouter,
}
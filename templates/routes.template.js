const { Router } = require('express');
const usersRouter = Router();

// actions
const {
  create,
  read,
  read_one,
  update,
  delete_one,
  delete_all
} = require('../_server/actions/actions.users');

usersRouter
  .route('/')
  .get(read)
  .post(create)
  .delete(delete_all);

usersRouter
  .route('/:userID')
  .get(read_one)
  .put(update)
  .delete(delete_one);

module.exports = {
  usersRouter,
}
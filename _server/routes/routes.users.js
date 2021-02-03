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
} = require('../actions/actions.users');

// middleware
const checkMethod = require('../middleware/checkMethod');

// router
usersRouter
  .route('/')
  .get(
    checkMethod('GET'),
    read
    )
  .post(
    checkMethod('POST'),
    create    
    )
  .delete(delete_all);

usersRouter
  .route('/:userID')
  .get(read_one)
  .put(update)
  .delete(delete_one);

module.exports = {
  usersRouter,
}
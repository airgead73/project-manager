const { Router } = require('express');
const { usersRouter } = require('./routes.users');

const apiRouter = Router();

apiRouter.use('/users', usersRouter);

module.exports = {
  apiRouter
}
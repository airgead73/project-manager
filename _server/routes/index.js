const { Router } = require('express');
const { usersRouter } = require('./routes.users');
const { projectsRouter } = require('./routes.projects');

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/projects', projectsRouter);

module.exports = {
  apiRouter
}
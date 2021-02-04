const { Router } = require('express');
const { usersRouter } = require('./routes.users');
const { projectsRouter } = require('./routes.projects');
const { chaptersRouter } = require('./routes.chapters');

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/chapters', chaptersRouter);

module.exports = {
  apiRouter
}
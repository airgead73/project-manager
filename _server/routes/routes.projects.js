const { Router } = require('express');
const projectsRouter = Router();

// models
const Project = require('../models/Project');

// actions
const {
  create,
  read,
  read_one,
  update,
  delete_one,
  delete_all
} = require('../actions/actions.projects');

// middleware
const checkMethod = require('../middleware/checkMethod');
const handleQuery = require('../middleware/handleQuery');

// router
projectsRouter
  .route('/')
  .get(checkMethod('GET'), handleQuery(Project), read)
  .post(checkMethod('POST'), create)
  .delete(checkMethod('DELETE'), delete_all);

projectsRouter
  .route('/:projectID')
  .get(checkMethod('GET'), read_one)
  .put(checkMethod('PUT'), update)
  .delete(checkMethod('DELETE'), delete_one);

module.exports = {
  projectsRouter,
}
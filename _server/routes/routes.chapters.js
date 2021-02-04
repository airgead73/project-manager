const { Router } = require('express');
const chaptersRouter = Router({ mergeParams: true });

// models
const Chapter = require('../models/Chapter');

// actions
const {
  create,
  read,
  read_one,
  update,
  delete_one,
  delete_all
} = require('../actions/actions.chapters');

// middleware
const checkMethod = require('../middleware/checkMethod');
const handleQuery = require('../middleware/handleQuery');

// populate options
const populate = [{ path: 'project', select: 'title' }];

// router
chaptersRouter
  .route('/')
  .get(checkMethod('GET'), handleQuery(Chapter, populate), read)
  .post(checkMethod('POST'), create)
  .delete(checkMethod('DELETE'), delete_all);

chaptersRouter
  .route('/:chapterID')
  .get(checkMethod('GET'), read_one)
  .put(checkMethod('PUT'), update)
  .delete(checkMethod('DELETE'), delete_one);

module.exports = {
  chaptersRouter,
}
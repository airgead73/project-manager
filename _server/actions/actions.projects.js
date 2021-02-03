const asyncHandler = require('../middleware/handleAsync');
const Project = require('../models/Project');
const createError = require('http-errors');
const { slugify } = require('../utils/strings');

/**
 * @route   POST /
 * @desc    create 
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  const project = new Project(req.body);
  await project.save();
  
  return res
    .status(200)
    .json({
      success: true,
      message: `${project.code} created`,
      project
    });

});

/**
 * @route   GET /
 * @desc    read
 * @access  private
 */

exports.read = asyncHandler(async function(req, res, next) {

  const { success, count, data } = res.results;

  return res
    .status(200)
    .json({
      success,
      count,
      message: count > 0 ? `${count} projects found` : 'No projects found',
      projects: count > 0 ? data : null
    });

});

/**
 * @route   GET /:ID
 * @desc    read one
 * @access  private
 */ 

exports.read_one = asyncHandler(async function(req, res, next) {

  const project = await Project.findById(req.params.projectID);

  if(!project) return next(createError(404, 'Project not found.'));

  return res
    .status(200)
    .json({ 
      success: true,
      count: 1, 
      message: `${project.title} found` ,
      data: project
    });    
  
});

/**
 * @route   PUT /:ID
 * @desc    update project
 * @access  private
 */ 

exports.update = asyncHandler(async function(req, res, next) {
  
  // find project
  let project = await Project.findById(req.params.projectID);

  if(!project) return next(createError(404, 'Project not found'));

  // build fields
  const {
    title,
    code,
    edition,
    author,
    client,
    desc
  } = req.body;

  const projectFields = {};

  if(title) projectFields.title = title;
  if(code) projectFields.code = code;
  if(edition) projectFields.edition = edition;
  if(author) projectFields.author = author;
  if(client) projectFields.client = client;
  if(desc) projectFields.desc = desc;

  // update project
  project = await Project.findByIdAndUpdate(req.params.projectID, { $set: projectFields }, { new: true });

  return res
    .status(200)
    .json({
      success: true,
      message: `${project.code} has been updated`,
      project
    });

}); 

/**
 * @route   DELETE /:ID
 * @desc    delete project
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {

  // find project
  let project = await Project.findById(req.params.projectID);

  if(!project) return next(createError(404, 'Project not found'));

  // delete project
  await project.remove();

  return res
    .status(200)
    .json({
      success: true,
      message: `${project.code} has been deleted`
    });

});

/**
 * @route   DELETE /
 * @desc    delete all
 * @access  private
 */

exports.delete_all = asyncHandler(async function(req, res, next) {

  Project.collection.drop();

  return res
  .status(200)
  .json({ 
    success: true, 
    message: 'Project collection deleted' 
  });  

});
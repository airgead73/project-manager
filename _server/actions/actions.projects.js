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
      message: 'Project created',
      project
    })

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
      message: `${project.fname} ${lname} found` ,
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
    fname,
    lname,
    role,
    email
  } = req.body;

  const projectFields = {};

  if(fname) projectFields.fname = fname;
  if(lname) projectFields.lname = lname;
  if(role) projectFields.role = role;
  if(email) projectFields.email = email;

  // update slug

  if(fname || lname) {
    console.log('update slug');

    let newStr;

    if(fname && lname) {  
      console.log('new first and last names');
      newStr = lname + ' ' + fname;

    } else if(fname && !lname) {
      console.log('new first name');
      newStr = project.lname + ' ' + fname;

    } else if(!fname && lname) {
      console.log('new last name');
      newStr = lname + ' ' + project.fname;
    }  

    projectFields.slug = slugify(newStr);
    
    console.log('new string: ', newStr);

  }  

  // update project
  project = await Project.findByIdAndUpdate(req.params.projectID, { $set: projectFields }, { new: true });

  return res
    .status(200)
    .json({
      success: true,
      message: `${project.fname} ${project.lname} has been updated`,
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
      message: `${project.fname} ${project.lname} has been deleted`
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
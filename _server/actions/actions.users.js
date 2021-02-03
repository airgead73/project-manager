const asyncHandler = require('../middleware/handleAsync');
const User = require('../models/User');
const createError = require('http-errors');
const { slugify } = require('../utils/strings');

/**
 * @route   POST /
 * @desc    create 
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {

  const user = new User(req.body);
  await user.save();
  
  return res
    .status(200)
    .json({
      success: true,
      message: 'User created',
      user
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
      message: count > 0 ? `${count} users found` : 'No users found',
      users: count > 0 ? data : null
    });

});

/**
 * @route   GET /:ID
 * @desc    read one
 * @access  private
 */ 

exports.read_one = asyncHandler(async function(req, res, next) {

  const user = await User.findById(req.params.userID);

  if(!user) return next(createError(404, 'User not found.'));

  return res
    .status(200)
    .json({ 
      success: true,
      count: 1, 
      message: `${user.fname} ${lname} found` ,
      data: user
    });    
  
});

/**
 * @route   PUT /:ID
 * @desc    update user
 * @access  private
 */ 

exports.update = asyncHandler(async function(req, res, next) {
  
  // find user
  let user = await User.findById(req.params.userID);

  if(!user) return next(createError(404, 'User not found'));

  // build fields
  const {
    fname,
    lname,
    role,
    email
  } = req.body;

  const userFields = {};

  if(fname) userFields.fname = fname;
  if(lname) userFields.lname = lname;
  if(role) userFields.role = role;
  if(email) userFields.email = email;

  // update slug

  if(fname || lname) {
    console.log('update slug');

    let newStr;

    if(fname && lname) {  
      console.log('new first and last names');
      newStr = lname + ' ' + fname;

    } else if(fname && !lname) {
      console.log('new first name');
      newStr = user.lname + ' ' + fname;

    } else if(!fname && lname) {
      console.log('new last name');
      newStr = lname + ' ' + user.fname;
    }  

    userFields.slug = slugify(newStr);
    
    console.log('new string: ', newStr);

  }  

  // update user
  user = await User.findByIdAndUpdate(req.params.userID, { $set: userFields }, { new: true });

  return res
    .status(200)
    .json({
      success: true,
      message: `${user.fname} ${user.lname} has been updated`,
      user
    });

}); 

/**
 * @route   DELETE /:ID
 * @desc    delete user
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {

  // find user
  let user = await User.findById(req.params.userID);

  if(!user) return next(createError(404, 'User not found'));

  // delete user
  await user.remove();

  return res
    .status(200)
    .json({
      success: true,
      message: `${user.fname} ${user.lname} has been deleted`
    });

});

/**
 * @route   DELETE /
 * @desc    delete all
 * @access  private
 */

exports.delete_all = asyncHandler(async function(req, res, next) {

  User.collection.drop();

  return res
  .status(200)
  .json({ 
    success: true, 
    message: 'User collection deleted' 
  });  

});
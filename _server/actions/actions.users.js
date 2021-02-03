const asyncHandler = require('../middleware/handleAsync');
const User = require('../models/User');
const createError = require('http-errors');

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
      msg: 'GET: read one user' ,
      data: user
    });    
  
});

/**
 * @route   PUT /:ID
 * @desc    update user
 * @access  private
 */ 

exports.update = asyncHandler(async function(req, res, next) {
  res.send('PUT: update');
}); 

/**
 * @route   DELETE /:ID
 * @desc    delete user
 * @access  private
 */ 

exports.delete_one = asyncHandler(async function(req, res, next) {
  res.send('DELETE: delete');
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
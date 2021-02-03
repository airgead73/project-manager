const asyncHandler = require('../_server/middleware/handleAsync');
//const User = require('');
const createError = require('http-errors');

/**
 * @route   POST /
 * @desc    create 
 * @access  private
 */

exports.create = asyncHandler(async function(req, res, next) {
  res.send('POST: create');
});

/**
 * @route   GET /
 * @desc    read
 * @access  private
 */

exports.read = asyncHandler(async function(req, res, next) {
  res.send('GET: read');
});

/**
 * @route   GET /:ID
 * @desc    read one
 * @access  private
 */ 

exports.read_one = asyncHandler(async function(req, res, next) {
  res.send('GET: read one');
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
  res.send('DELETE: all');
});
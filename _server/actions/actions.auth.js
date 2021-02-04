const asyncHandler = require('../middleware/handleAsync');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, ISDEV } = require('../../config/constants');

/**
 * @route   POST /
 * @desc    user login
 * @access  private
 */

exports.login = asyncHandler(async function(req, res, next) {

  const cookieOptions = {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
    secure: ISDEV ? false : true
  }

  const { email, password } = req.body;

  try {

    const user = await User.login({ email, password }, next);
    const token = user.getToken();

    return res
      .status(200)
      .cookie('jwt', token, cookieOptions)
      .json({
        success: true,
        message: `${user.fname} ${user.lname} is signed in`,
        token
      });

  } catch(err) {

    ISDEV && console.log(err);

    return res
      .status(400)
      .json({
        success: false,
        messages: [
          { authentication: 'Email and password combination does not match.'  }
        ]
      });    

  }

});

/**
 * @route   GET /
 * @desc    user logout
 * @access  private
 */

exports.logout = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .cookie('jwt', '', { maxAge: 1 })
    .json({
      success: true,
      message: 'User logged out'
    });

});

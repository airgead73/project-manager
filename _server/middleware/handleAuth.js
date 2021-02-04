const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ISDEV, JWT_SECRET } = require('../../config/constants');

const requireAuth = (req, res, next) => {

  // skip if path is /api/auth
  if(req.path === '/api/auth' && req.method === 'POST') return next();

  // get cookie
  const token = req.cookies.jwt;

  // check if token exists and is valid
  if(token) {

    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if(err) {

        // token not valid
        ISDEV && console.log(err.message);
        return res
          .status(401)
          .json({
            success: false,
            message: 'Not authorized'
          });

      } else {

        // token present and valid
        ISDEV && console.log(decodedToken);
        return next();

      }
    });

  } else {

    // no token
    return res
      .status(401)
      .json({
        success: false,
        message: 'Not authorized'
      });

  }

}

// check current user
const checkUser = (req, res, next) => {

  const token = req.cookies.jwt;

  if(token) {

    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if(err) {

        // token not valid
        ISDEV && console.log(err.message);
        res.locals.user = null;
        return next();

      } else {

        // token present and valid
        ISDEV && console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        return next();

      }
    });    

  } else {

    res.locals.user = null;
    next();

  }

}

module.exports = {
  requireAuth,
  checkUser
};
const createError = require('http-errors');

const checkMethod = (_method) => async (req, res, next) => {

  console.log(req.method);

  return next();

}

module.exports = checkMethod;
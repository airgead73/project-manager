const createError = require('http-errors');
const { ISDEV } = require('../../config/constants');

const checkMethod = (_method) => async (req, res, next) => {  

  if(_method !== req.method) {
    if(ISDEV) console.log('check method: ', req.method);
    return next(createError(405, 'Incorrect request method'));
  }

  return next();

}

module.exports = checkMethod;
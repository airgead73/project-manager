const { ISDEV } = require('../../config/constants');

const errorValidation = (_err, _req, _res, _resWithJson) => {
  if(ISDEV) console.log('validation error');
  let errors = []
  Object.values(_err.errors).forEach(({ properties }) => {
    let error = {}
    error[properties.path] = properties.message;
    errors.push(error);
  });

  return _res  
    .status(_err.status || 500)
    .json({
      success: false,
      name: _err.name,
      status: _err.status || 500,
      messages: errors        
    });   
}

const errorDuplicate = (_err, _req, _res, _resWithJson) => {
  if(ISDEV) console.log('duplicate error');
  return _res  
  .status(_err.status || 500)
  .json({
    success: false,
    name: _err.name,
    status: _err.status || 500,
    messages: [
      { email: 'Email is already in use.'}
    ]       
  });   
}

const errorNotFound = (_err, _req, _res, _resWithJson) => {
  if(ISDEV) console.log('not found error');

  return _res  
    .status(_err.status || 500)
    .json({
      success: false,
      name: _err.name,
      status: _err.status || 500,
      messages: [{ resource: _err }]      
    }); 
  
}

const errorSystem = (_err, _req, _res) => {
  if(ISDEV) console.log('system error');
  return _res  
  .status(_err.status || 500)
  .json({
    success: false,
    name: _err.name,
    status: _err.status || 500,
    messages: [{ system: err.message } ]      
  });      
}

const errorGeneral = (_err, _req, _res) => {
  if(ISDEV) console.log('general error');
  return _res  
  .status(_err.status || 500)
  .json({
    success: false,
    name: _err.name,
    status: _err.status || 500,
    messages: [{ resource: err }]        
  }); 
}

const handleError = async function(err, req, res, next) {

  const name = err.name;
  const code = err.code;

  if(name === 'ValidationError') {
    return errorValidation(err, req, res);
  } else if(name === 'NotFoundError') {
    return errorNotFound(err, req, res);
  } else if(name === 'Error') {
    return errorSystem(err, req, res);
  } else if(code === 11000) {
    return errorDuplicate(err, req, res);
  } else {
    return res  
      .status(err.status || 500)
      .json({
        success: false,
        name: err.name,
        status: err.status || 500,
        messages: [{ resource: err }]        
      }); 
  }

}

module.exports = handleError;
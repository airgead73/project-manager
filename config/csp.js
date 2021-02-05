const { NONCE } = require('./constants');
const policies = {
  directives: {
    "default-src": ["'self'"],
    "img-src": ["'self'", "*.cloudinary.com", "data:"],
    "font-src": ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    "style-src-elem": ["'self'", `'nonce-${NONCE}'`,"https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    "style-src": ["'self'", `'nonce-${NONCE}'`]
  }
}



module.exports = policies;
const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs');
const { ISDEV, JWT_SECRET, JWT_EXP} = require('../../config/constants');
const jwt = require('jsonwebtoken');
const { slugify } = require('../utils/strings');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Provide an appropriately formatted email.'],
    unique: [true, 'User already exists.'],
    trim: true,
    lowercase: true,
    validate: [isEmail, 'Please, enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Provide a password.'],
    trim: true,
    minlength: [5, 'Password should be between 5 and 15 characters'],
    maxlength: [100, 'Password should be between 5 and 15 characters'],
    select: false
  },
  slug: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }  
});

// Hash password
UserSchema.pre('save', async function(next) {

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();

});

// slug name
UserSchema.pre('save', function(next) {

  this.slug = slugify(this.name);

  next();

});

// Login user
UserSchema.statics.login = async function(_credentials, res) {

  const { email, password } = _credentials;


  const user = await this.findOne({ email }).select('password');

  if(user) {

    const auth = await bcrypt.compare(password, user.password);

    if(auth) {
      return user;
    }

    ISDEV && console.log('wrong password');

  } 

  ISDEV && console.log('wrong email');
 

}

// Get token for logged in user
UserSchema.methods.getToken = function() {
  return jwt.sign({ id: this.id }, JWT_SECRET, {
    expiresIn: JWT_EXP
  });
}

module.exports = mongoose.model('User', UserSchema);
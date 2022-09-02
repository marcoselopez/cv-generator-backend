const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
//* VALIDATION PACKAGE
const { isEmail } = require('validator');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please indicate a Username'],
    minLength: [3, 'First Name is too short']
  },
  email: {
    type: String,
    required: [true, 'Please indicate an Email'],
    unique: [true, 'Email is already used'],
    validate: [isEmail, 'Please enter a valid email'],
    maxLength: [30, 'Email is too long']
  },
  password: {
    type: String,
    required: [true, 'Please indicate a Password'],
    minLength: [4, 'Password is too short']
  }
})

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSaltSync()
  this.password = await bcrypt.hashSync(this.password, salt);
  next();
})

module.exports = model('User', userSchema)
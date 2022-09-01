const User = require('../models/userModel');

const validateEmail = (email) => {
  const isEmail = User.findOne({email})

  if(isEmail){
    throw new Error(`The Email ${email} already exists`)
  }
}

module.exports = { validateEmail };
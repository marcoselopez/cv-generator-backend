const User = require('../models/userModel')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginUser = async (request, response) => {
  const {email, password} =  request.body

  const searchEmail = await User.findOne({email});
  const {_id, username} = searchEmail;

  if(searchEmail){
    const match = bcrypt.compare(password, searchEmail.password)
    if(match){
      const payload = {check: true}
      const token = jwt.sign(payload, process.env.SECRETKEY, {
        expiresIn: 900
      });
      response.status(200).json({
        message: 'User logged succesfully', token, _id, username
      })
    } else {
      response.status(401).json({
        message: 'Incorrect password'
      })
    }
  } else {
    response.status(401).json({
      message: 'Incorrect password'
    })
  }
}

module.exports = loginUser;
const User = require('../models/userModel')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginUser = async (request, response) => {
  const {email, password} =  request.body

  const searchEmail = await User.findOne({email});
  
  if(searchEmail){
    const {username} = searchEmail;
    const match = bcrypt.compareSync(password, searchEmail.password)
    if(match){
      const payload = {check: true}
      const token = jwt.sign(payload, process.env.SECRETKEY, {
        expiresIn: 900
      });
      response.status(200).json({
        message: 'User logged succesfully', token, username
      })
    } else {
      response.status(401).json({
        message: 'Incorrect password'
      })
    }
  } else {
    response.status(401).json({
      message: 'Incorrect Email'
    })
  }
}

module.exports = loginUser;
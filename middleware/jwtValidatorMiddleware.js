const jwt = require('jsonwebtoken')
require('dotenv').config()

const protection = (request, response, next) => {
  const token = request.headers['access-token'];

  if(token){
    jwt.verify(token, process.env.SECRETKEY, (error, decoded) => {
      if(error){
        return response.status(401).json({
          message: 'Invalid Token'
        });
      } else {
        console.log(decoded)
        request.decoded = decoded
        next()
      }
    })
  } else {
    response.status(401).send({
      message: 'Token not provided'
    })
  }
}
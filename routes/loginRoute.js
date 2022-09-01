const {Router} = require('express')
const route = Router()
const loginUser = require('../controllers/loginController')



route.post('/api/users/login', loginUser)

module.exports = route;
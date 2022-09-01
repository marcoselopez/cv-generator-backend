const User = require('../models/userModel');

const handleErrors = (error) => {
  let errorsObject = {};

  if(error.message.includes('User validation failed')){
    Object.values(error.errors).forEach((properties) => {
      errorsObject[properties.path] = properties.message
    })
  }

  return errorsObject
}


//- CREATE USER
const createUser = (request, response) => {

  const {username, email, password} =  request.body;

  const newUser = new User({
    username,
    email,
    password
  });

  newUser.save()
    .then((result) => { response.json({
      message: 'User created succesfully',
      createdUser: {
        _id: result._id,
        username: result.username,
        email: result.email,
        password: result.password
      }
    }) })
    .catch(error => {
      const errors = handleErrors(error);
      return response.status(400).json({errors});
    })
}

//- EDIT USER
const editUser = (request, response) => {
  const {username, email, password} = request.body;

  User.findByIdAndUpdate(request.params.userId, {
    username,
    email,
    password
  }, {new: true})
    .then(() => {
      response.json('User edited succesfully!')
    })
    .catch(error => {
      response.status(400).json({
        message: "Cannot edit user"
      })
    })
}

//- GET USERS
const getUsers = (request, response) => {
  User.find()
    .select('_id username email password') //- Eliminamos el "__v"
    .then(users => {
      response.status(200).json(users)
    })
    .catch(error => {
      response.status(404).json({
        message: "Cannot find users"
      })
    })
}


//- DELETE USERS
const deleteUser = (request, response) => {
  User.findByIdAndRemove(request.params.userId)
    .then((user) => {
      response.json(user)
    })
    .catch(error => {
      response.status(404).json({
        message: "Cannot delete user"
      })
    })
}

//- DELETE ALL USERS
const deleteAllUsers = (request, response) => {
  User.remove({})
    .then((result) => {
      response.status(202).json({
        message: 'Deleted all users succesfully',
        result: result
      })
    })
}

module.exports = { createUser, editUser, deleteUser, getUsers, deleteAllUsers };
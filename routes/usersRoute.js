const { Router } = require('express');
const { getUsers, createUser, editUser, deleteUser, deleteAllUsers } = require('../controllers/usersController');
const route = Router();


route.get('/api/users', getUsers);
route.post('/api/users', createUser);
route.put('/api/users/:userId', editUser);
route.delete('/api/users/:userId', deleteUser);
route.delete('/api/users', deleteAllUsers);

module.exports = route;
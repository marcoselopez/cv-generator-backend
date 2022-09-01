require('dotenv').config();
require('./database/database')
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT;

//- ROUTES EXPORTS
const getUsers = require('./routes/usersRoute');
const editUser = require('./routes/usersRoute');
const createUser = require('./routes/usersRoute');
const deleteUser = require('./routes/usersRoute');
const deleteAllUsers = require('./routes/usersRoute');
const loginUser = require('./routes/loginRoute')

app.use(cors());
app.use(express.json());

//-USERS CALL
app.use('/', getUsers)
app.use('/', editUser)
app.use('/', createUser)
app.use('/', deleteUser)
app.use('/', deleteAllUsers)

//-LOGIN CALL
app.use('/', loginUser)

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
})
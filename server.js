require('dotenv').config();

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

//- DATA
const DATA = [
  {
    name: 'Emmanuel',
    age: 8,
    profession: 'Developer',
    address: 'Gobernador Fernando Riera 260'
  }
]

//- API ROUTES
//GET
app.get('/api', (request, response) => {
  response.send(DATA)
})






app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`)
})
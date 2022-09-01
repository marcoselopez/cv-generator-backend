require('dotenv').config();
const mongoose = require('mongoose');

const connectionToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Conexión exitosa a la DB')
  } catch (error) {
    console.log(error)
  }
}

connectionToDB()
module.exports = { connectionToDB }
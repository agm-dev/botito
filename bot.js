// Npm stuff:
const mongoose = require('mongoose')
require('dotenv').config()

// Bots stuff:
const telegram = require('./bots/bot-telegram')

// Connection with the MongoDB database:
mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise // Tell mongoose to use Node ES6 promises
mongoose.connection.on('error', err => {
  console.error(`mongoose connection: ${err.message}`)
})

// Bots connection:
telegram.connect()

// Requires:
const mongoose = require('mongoose')

// TelegramUser schema definition
const TelegramUser = new mongoose.Schema({
  userId: { // from.id
    type: Number,
    required: 'TelegramUser needs an id'
  },
  name: { // from.first_name
    type: String,
    required: 'TelegramUser needs a name',
    trim: true
  },
  username: {
    type: String,
    required: 'TelegramUser needs a username',
    trim: true
  },
  lang: { // from.language_code 'es'
    type: String,
    uppercase: true,
    trim: true,
    default: 'EN'
  },
  lastUpdate: { // date like Date.now() / 1000 (in seconds instead miliseconds)
    type: Number,
    default: Date.now()
  }
})

// TelegramChat schema definition:
const TelegramChatSchema = new mongoose.Schema({
  chatId: { // chat.id
    type: Number,
    required: 'TelegramChatSchema needs an id of chat',
    index: true
  },
  title: { // chat.title in groups
    type: String,
    trim: true,
    default: ''
  },
  type: {
    type: String, // chat.type private or group
    required: 'TelegramChatSchema needs a type of chat',
    trim: true
  },
  lang: {
    type: String, // EN, ES ...
    default: 'EN',
    trim: true
  },
  lastUpdate: { // date like Date.now() / 1000
    type: Number,
    default: Date.now()
  },
  users: [ TelegramUser ]
})

module.exports = mongoose.model('TelegramChat', TelegramChatSchema)

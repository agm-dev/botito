// Requires:
const TeleBot = require('telebot')
const telegramBotController = require('../controllers/telegram-bot-controller')
const lang = require('../lang/default.json')

// Options allowed, look the telebot documentation for it
const telegramBot = new TeleBot({
  token: process.env.TELEGRAM_BOT_TOKEN,
  usePlugins: ['floodProtection'],
  pluginConfig: {
    floodProtection: {
      interval: 1,
      message: lang.FLOOD_PROTECTION['EN']
    }
  }
})

telegramBot.on('connect', telegramBotController.connectionHandler)
telegramBot.on('disconnect', telegramBotController.disconnectionHandler)
telegramBot.on(/\/+/, telegramBotController.commandsHandler) // regex to match messages starting by / (commands)
telegramBot.on(/^[^/]+/, telegramBotController.textHandler) // regex to match messages that not start by /

module.exports = telegramBot

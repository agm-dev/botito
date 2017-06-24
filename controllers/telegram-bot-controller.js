// Requires:
const TelegramChat = require('../models/TelegramChat')
const adjetiveisor = require('adjetiveisor')
const lang = require('../lang/default.json')

const puto = adjetiveisor()
puto.config({ ms: 'puto', mp: 'putos', fs: 'puta', fp: 'putas' })

exports.connectionHandler = () => {
  console.log('Telegram bot is connected')
}

exports.disconnectionHandler = () => {
  console.log('Telegram bot has been disconnected')
}

exports.textHandler = (msg) => {
  updateData(msg)
  return msg.reply.text('Ok bro', { asReply: false })
}

exports.commandsHandler = (msg) => {
  const commandRegex = new RegExp('^/\\w*', 'gi')
  const matches = commandRegex.exec(msg.text)
  const command = (matches.length) ? matches[0] : ''
  const text = msg.text.replace(commandRegex, '').trim()
  switch (command) {
    case '/puto': putoHandler(text, msg); break
    case '/ping': pingHandler(msg); break
    default: commandError(command, msg)
  }
}

const updateData = async (msg) => {
  const data = formatData(msg)
  const chat = await TelegramChat.findOne({ chatId: data.chatId })
  if (!chat) {
    console.log('storing new chat')
    const newChat = new TelegramChat(data)
    newChat.save()
  } else {
    console.log('chat already exists')
    // chat exists? create, update
    // user is in the chat? create, update
  }
}

const formatData = (msg) => {
  return {
    chatId: msg.chat.id,
    title: msg.chat.title,
    type: msg.chat.type,
    lastUpdate: msg.date * 1000,
    users: [{
      userId: msg.from.id,
      name: msg.from.first_name,
      username: msg.from.username,
      lang: msg.from.language_code,
      lastUpdate: msg.date * 1000
    }]
  }
}

const commandError = (command, msg) => {
  return msg.reply.text(`${command} ${lang.IS_NOT_ALLOWED}`, { asReply: false })
}

const putoHandler = (text, msg) => {
  if (!text) return msg.reply.text(lang.PUTO_NO_TEXT, { asReply: true })
  const translatedText = puto.translate(text)
  return msg.reply.text(translatedText, { asReply: true })
}

const pingHandler = (msg) => msg.reply.text('pong')

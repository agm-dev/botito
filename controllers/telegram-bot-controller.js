// Requires:
const TelegramChat = require('../models/TelegramChat')
const adjetiveisor = require('adjetiveisor')
const toValyrian = require('../utils/valyrian-translator')
const lang = require('../lang/default.json')

const puto = adjetiveisor()
const jodido = adjetiveisor()
puto.config({ ms: 'puto', mp: 'putos', fs: 'puta', fp: 'putas' })
jodido.config({ ms: 'jodido', mp: 'jodidos', fs: 'jodida', fp: 'jodidas' })

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
  updateData(msg)
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

exports.inlineQueryHandler = (msg, bot) => {
  const query = msg.query
  const answers = bot.answerList(msg.id, { cacheTime: 60 })
  const putoTranslation = puto.translate(query)
  const jodidoTranslation = jodido.translate(query)
  const valyrianTranslation = toValyrian(query)

  answers.addArticle(genArticle('query', 'puto translation', putoTranslation, putoTranslation))
  answers.addArticle(genArticle('query2', 'jodido translation', jodidoTranslation, jodidoTranslation))
  answers.addArticle(genArticle('query3', 'valyrian translation', valyrianTranslation, valyrianTranslation))

  return bot.answerQuery(answers)
}

/*
* This one adds a chat document if not exists
* add user if not exists in chat.users
* updates date on chat and user
*/
const updateData = async (msg) => {
  const data = formatData(msg)
  const chat = await TelegramChat.findOne({ chatId: data.chatId })
  if (!chat) {
    const newChat = new TelegramChat(data)
    newChat.save()
  } else {
    chat.lastUpdate = msg.date * 1000
    const user = chat.users.find(user => (user.userId === data.users[0].userId))
    if (user) {
      chat.users.map(u => {
        if (u.userId === user.userId) u.lastUpdate = msg.date * 1000
      })
    } else {
      chat.users.push(data.users[0])
    }
    chat.save()
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

// This is used to easy format article object in inline query.
const genArticle = (id, title, description, text) => {
  return {id, title, description, message_text: text}
}

const commandError = (command, msg) => {
  const langCode = msg.from.language_code.toUpperCase()
  return msg.reply.text(`${command} ${lang.IS_NOT_ALLOWED[langCode]}`, { asReply: false })
}

const putoHandler = (text, msg) => {
  const langCode = msg.from.language_code.toUpperCase()
  if (!text) return msg.reply.text(`${lang.PUTO_NO_TEXT[langCode]}`, { asReply: true })
  const translatedText = puto.translate(text)
  return msg.reply.text(translatedText, { asReply: true })
}

const pingHandler = (msg) => msg.reply.text('pong')

// Requires:
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

const commandError = (command, msg) => {
  return msg.reply.text(`${command} ${lang.IS_NOT_ALLOWED}`, { asReply: false })
}

const putoHandler = (text, msg) => {
  const translatedText = puto.translate(text)
  return msg.reply.text(translatedText, { asReply: true })
}

const pingHandler = (msg) => msg.reply.text('pong')

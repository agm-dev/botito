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

}

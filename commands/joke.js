module.exports = {
  name: 'joke',
  description: 'Ping!',
  execute(message) {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Funny joke!`);
  },
};

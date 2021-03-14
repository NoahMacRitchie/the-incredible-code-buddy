module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(message) {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  },
};

module.exports = {
  name: 'ping',
  description: 'Ping!',
  help: 'Type !ping to test the latency of the bots connection',
  execute(message) {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  },
};

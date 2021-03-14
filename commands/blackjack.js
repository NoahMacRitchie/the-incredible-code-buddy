const { MessageEmbed } = require('discord.js');
const { Blackjack } = require('../games/blackjack');

const embededBuilder = (message, content) => {
  const embed = new MessageEmbed();
  embed.setColor('#743873');
  embed.setTitle('Blackjack🃏');

  embed.setAuthor(message.author.username, message.author.avatarURL());
  embed.addField(content, '\u200b');

  embed.setTimestamp();
  return embed;
};

const STATE = {
  Blackjack: null,
};

const gameStart = (message) => {
  if (STATE.Blackjack == null) {
    STATE.Blackjack = new Blackjack();
  }
  STATE.Blackjack.newInstance(message.channel.id, [message.author.id]);
};

const gameAction = (message, args) => {
  const instance = STATE.Blackjack.getGame(message.channel.id, message.author.id);
  const playerId = instance.getCurrentPlayer();
  const discordId = instance.players[playerId];

  if (discordId !== message.author.id) {
    message.reply(embededBuilder(message, 'You\'re not in a game!'));
    return;
  }

  const messageBody = args.slice(0).join();
  const action = instance.messageToAction(messageBody);
  instance.applyAction(action);
};

const gameEnd = (message) => {
  delete STATE.Blackjack.getGame(message.channel.id, message.author.id);
};

module.exports = {
  name: 'blackjack',
  description: 'Play a game of black jack against the dealer',
  help: '!blackjack - starts blackjack game'
    + '!blackjack hit - dealer will give you another card (game must be started)'
    + '!blackjack stay - dealer reveal their cards (game must be started)',
  execute(message, args) {
    if (args.length === 0) {
      gameStart(message);
      const instance = STATE.Blackjack.getGame(message.channel.id, message.author.id);
      message.channel.send(embededBuilder(message, instance.stateInformation()));
      if (instance.isTerminal()) {
        gameEnd(message);
      }
      return;
    }
    const instance = STATE.Blackjack?.getGame(message.channel.id, message.author.id);
    if (instance == null) {
      message.reply(embededBuilder(message, 'Please start a game first! Try \'!blackjack\'.'));
      return;
    }
    switch (args[0]) {
      case 'hit':
      case 'stay':
        gameAction(message, args);
        message.reply(embededBuilder(message, instance.stateInformation()));

        if (instance.isTerminal()) {
          gameEnd(message);
        }
        break;
      default:
        message.reply(embededBuilder(message, 'That\'s not a valid move! Try \'!blackjack hit\' or \'!blackjack stay\'.'));
    }
  },
};

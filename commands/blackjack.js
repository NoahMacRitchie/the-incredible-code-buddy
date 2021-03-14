const STATE = {
  Blackjack: null,
};

const { Blackjack } = require('../games/blackjack');

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
    message.reply(`You're not in a game!`);
    return;
  }

  const messageBody = args.slice(0).join();
  const action = instance.messageToAction(messageBody);
  instance.applyAction(action);
};

const gameEnd = (message) => {
  delete STATE.Blackjack.getGame(message.channel.id, message.author.id);
  message.channel.send("Game over.");
};

module.exports = {
  name: 'blackjack',
  description: 'Blackjack',
  execute(message, args) {
    if (args.length === 0) {
      gameStart(message);
      message.reply('Blackjack started!');
      const instance = STATE.Blackjack.getGame(message.channel.id, message.author.id);
      message.channel.send(instance.stateInformation());
      if (instance.isTerminal()) {
        gameEnd(message);
      }
      return;
    }
    switch (args[0]) {
      case 'hit':
      case 'stay': 
        const instance = STATE.Blackjack.getGame(message.channel.id, message.author.id);
        gameAction(message, args);
        message.reply(instance.stateInformation());

        if (instance.isTerminal()) {
          gameEnd(message);
        }
        break;
      default:
        message.reply(`That's not a valid move! Try '!blackjack hit' or '!blackjack stay'.`);
    }
  },
};

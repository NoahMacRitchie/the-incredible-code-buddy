const STATE = {
  game: null,
  instance: null,
};

const { Blackjack } = require('../games/blackjack');

const gameStart = (message) => {
  STATE.game = new Blackjack([message.author.id]);
  STATE.instance = STATE.game.newInstance();

  console.log(STATE.game);
  console.log(STATE.instance);
};

const gameAction = (message, args) => {
  const playerId = STATE.instance.getCurrentPlayer();
  const discordId = STATE.game.players[playerId];

  if (discordId !== message.author.id) {
    message.reply(`You're not in a game!`);
    return;
  }

  const { instance } = STATE;
  const messageBody = args.slice(0).join();
  const action = instance.messageToAction(messageBody);
  instance.applyAction(action);
};

const gameEnd = (message) => {
  STATE.game = null;
  STATE.instance = null;
  message.channel.send("Game over.");
};

module.exports = {
  name: 'blackjack',
  description: 'Blackjack',
  execute(message, args) {
    if (args.length === 0) {
      gameStart(message);
      message.channel.send('Blackjack started!');
      message.channel.send(STATE.instance.stateInformation());
      if (STATE.instance.isTerminal()) {
        gameEnd(message);
      }
      return;
    }
    switch (args[0]) {
      case 'hit':
      case 'stay': 
        gameAction(message, args);
        message.channel.send(STATE.instance.stateInformation());

        if (STATE.instance.isTerminal()) {
          gameEnd(message);
        }
        break;
      default:
        message.channel.send(`That's not a valid move! Try '!blackjack hit' or '!blackjack stay'.`);
    }
  },
};

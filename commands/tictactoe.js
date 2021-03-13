const STATE = {
  game: null,
  instance: null,
};

const { TicTacToe } = require('../games/tictactoe');

const gameStart = (message) => {
  const players = message.mentions.users;
  const playerIds = Array.from(players.keys());

  STATE.game = new TicTacToe(playerIds);
  STATE.instance = STATE.game.newInstance();

  console.log(STATE.game);
  console.log(STATE.instance);
};

const gameAction = (message, args) => {
  const playerId = STATE.instance.getCurrentPlayer();
  const discordId = STATE.game.players[playerId];

  if (discordId !== message.author.id) {
    message.reply('Not your turn.');
    return;
  }

  const { instance } = STATE;
  const messageBody = args.slice(1).join();
  const action = instance.messageToAction(messageBody);
  instance.applyAction(action);
};

const gameEnd = (message) => {
  STATE.game = null;
  STATE.instance = null;
  message.channel.send('Game over.');
};

module.exports = {
  name: 'ttt',
  description: 'Ping!',
  execute(message, args) {
    switch (args[0]) {
      case 'start':
        gameStart(message);
        message.channel.send('Game started!');
        break;
      case 'a':
      case 'action':
        gameAction(message, args);
        message.channel.send(STATE.instance.stateInformation());

        if (STATE.instance.isTerminal()) {
          gameEnd(message);
        }
        break;
      default:
        break;
    }
  },
};

const STATE = {
  TicTacToe: null,
};

const { TicTacToe } = require('../games/tictactoe');

const gameStart = (message) => {
  if (STATE.TicTacToe == null) {
    STATE.TicTacToe = new TicTacToe();
  }
  const players = message.mentions.users;
  const playerIds = Array.from(players.keys());

  STATE.TicTacToe.newInstance(message.channel.id, playerIds);
};

const gameAction = (message, args) => {
  const instance = STATE.TicTacToe.getGame(message.channel.id, message.author.id);
  const playerId = instance.getCurrentPlayer();
  const discordId = instance.players[playerId];

  if (discordId !== message.author.id) {
    message.reply('Not your turn.');
    return;
  }

  const messageBody = args.slice(1).join();
  const action = instance.messageToAction(messageBody);
  instance.applyAction(action);
};

const gameEnd = (message) => {
  delete STATE.TicTacToe.getGame(message.channel.id, message.author.id);
  message.channel.send('Game over.');
};

module.exports = {
  name: 'ttt',
  description: 'Tic tac toe!',
  execute(message, args) {
    switch (args[0]) {
      case 'start':
        gameStart(message);
        message.channel.send('Game started!');
        break;
      case 'a':
      case 'action':
        gameAction(message, args);
        message.channel.send(STATE.TicTacToe.getGame(message.channel.id, message.author.id).stateInformation());

        if (STATE.TicTacToe.getGame(message.channel.id, message.author.id).isTerminal()) {
          gameEnd(message);
        }
        break;
      default:
        break;
    }
  },
};

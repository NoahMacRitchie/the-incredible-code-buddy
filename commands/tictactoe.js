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
    if (Array.from(message.mentions.users.keys()).length === 2) {
      gameStart(message);
      message.reply('Tic Tac Toe started!');
      const instance = STATE.TicTacToe.getGame(message.channel.id, message.author.id);
      message.channel.send(instance.stateInformation());
      if (instance.isTerminal()) {
        gameEnd(message);
      }
      return;
    }

    const instance = STATE.TicTacToe?.getGame(message.channel.id, message.author.id);
    if (instance == null) {
      message.reply(`Please start a game first! Try '!ttt @<UserID> @<UserID>'.`);
      return;
    }

    switch (args[0]) {
      case 'a':
      case 'action':
        gameAction(message, args);
        message.channel.send(instance.stateInformation());
        if (instance.isTerminal()) {
          gameEnd(message);
        }
        break;
      default:
        message.reply(`That's not a valid move! Try '!ttt action <Position>'.`);
        break;
    }
  },
};

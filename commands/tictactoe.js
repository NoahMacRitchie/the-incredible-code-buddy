const { MessageEmbed } = require('discord.js');
const { TicTacToe } = require('../games/tictactoe');

const embededBuilder = (message, content) => {
  const embed = new MessageEmbed();
  embed.setColor('#743873');
  embed.setTitle('TicTacToe :x:  :o:');

  embed.setAuthor(message.author.username, message.author.avatarURL());
  embed.addField(content, '\u200b');

  embed.setTimestamp();
  return embed;
};

const STATE = {
  TicTacToe: null,
};

const gameStart = (message) => {
  if (STATE.TicTacToe == null) {
    STATE.TicTacToe = new TicTacToe();
  }
  const players = message.mentions.users;
  const playerIds = Array.from(players.keys());

  STATE.TicTacToe.newInstance(message.channel.id, playerIds);
};

const gameAction = (message, args) => {
  const instance = STATE.TicTacToe.getGame(message.channel.id, message.author.id).gameInstance;
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
  const { opponent } = STATE.TicTacToe.getGame(message.channel.id, message.author.id);

  delete STATE.TicTacToe.getGame(message.channel.id, opponent).gameInstance;
  delete STATE.TicTacToe.getGame(message.channel.id, message.author.id).gameInstance;

  message.channel.send(embededBuilder(message, 'Game over.'));
};

module.exports = {
  name: 'ttt',
  description: 'Play a game of TicTacToe with a friend',
  help: '!ttt start [@player1] [@player2] - Starts a game of TicTacToe between player1 & player 2\n'
  + '!ttt a [0-8] - Attempts to make move on a cell',
  execute(message, args) {
    const players = Array.from(message.mentions.users.keys());
    if (players.length === 2) {
      gameStart(message);
      message.channel.send(`<@${players[0]}>, <@${players[1]}>, Tic Tac Toe started!`);
      const instance = STATE.TicTacToe.getGame(message.channel.id, players[0]).gameInstance;
      message.channel.send(embededBuilder(message, instance.stateInformation()));
      if (instance.isTerminal()) {
        gameEnd(message);
      }
      return;
    }

    const instance = STATE.TicTacToe?.getGame(message.channel.id, message.author.id)?.gameInstance;
    if (instance == null) {
      message.reply(embededBuilder(message, 'Please start a game first! Try \'!ttt <@UserID> <@UserID>\'.'));
      return;
    }

    switch (args[0]) {
      case 'a':
      case 'action':
        gameAction(message, args);
        message.channel.send(embededBuilder(message, instance.stateInformation()));

        if (instance.isTerminal()) {
          gameEnd(message);
        }
        break;
      default:
        message.reply(embededBuilder(message, 'That\'s not a valid move! Try \'!ttt action [0-8]\'.'));
        break;
    }
  },
};

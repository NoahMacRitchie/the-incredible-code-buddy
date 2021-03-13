const STATE = {
    game: null,
    instance: null
}

const { TicTacToe } = require('../games/tictactoe')

const gameStart = (message) => {
    let players = message.mentions.users;
    let player_ids = Array.from(players.keys());

    STATE.game = new TicTacToe(player_ids);
    STATE.instance = STATE.game.newInstance();

    console.log(STATE.game);
    console.log(STATE.instance);
}

const gameAction = (message, args) => {
    let player_id = STATE.instance.getCurrentPlayer();
    let discord_id = STATE.game.players[player_id];

    if (discord_id != message.author.id) {
        message.reply('Not your turn.')
        return;
    }

    let instance = STATE.instance;
    let messageBody = args.slice(1).join();
    let action = instance.messageToAction(messageBody);
    instance.applyAction(action);
}

const gameEnd = (message) => {
    STATE.game = null;
    STATE.instance = null;
    message.channel.send('Game over.');
}

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
        }
    },
};

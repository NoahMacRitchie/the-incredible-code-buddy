const {Game, GameInstance} = require('./game')

class TicTacToe extends Game {
    constructor() {
        super();
    }
    
    newInstance(channel, players) {
        const gameInstance = new TicTacToeInstance(players);
        players.forEach((player) => {
            this._games[channel] = this._games[channel] || {};
            this._games[channel][player] = gameInstance;
        });
        return gameInstance;
    }
}

class TicTacToeInstance extends GameInstance {
    constructor(players) {
        super(players);
        this.board = ['-', '-', '-', '-', '-', '-', '-', '-', '-']
        this.symbols = ['X', 'O']
        this.currentPlayer = 0;
        this.numPlayers = this.players.length
    }

    applyAction(action) {
        if (action < 0 || action > 9) {
            throw 'Invalid action!';
        }

        if (this.board[action] != '-') {
            throw 'Invalid action!';
        }

        this.board[action] = this.symbols[this.currentPlayer];
        this.currentPlayer = (this.currentPlayer + 1) % this.numPlayers;
    }

    isTerminal() {
        if (this.board.includes('-')) {
            return false;
        }
        return true;
    }

    stateInformation() {
        return JSON.stringify(this.board);
    }

    messageToAction(message) {
        return parseInt(message);
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }
}

module.exports = {
    TicTacToe, TicTacToeInstance
}
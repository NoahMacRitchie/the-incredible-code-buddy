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
        this.board = [' ', ' ', ' ', ' ' , ' ', ' ', ' ', ' ', ' ']
        this.symbols = ['X', 'O']
        this.currentPlayer = 0;
        this.numPlayers = this.players.length
    }

    applyAction(action) {
        if (action < 0 || action > 9) {
            throw 'Invalid action!';
        }

        if (this.board[action] != ' ') {
            throw 'Invalid action!';
        }

        this.board[action] = this.symbols[this.currentPlayer];
        this.currentPlayer = (this.currentPlayer + 1) % this.numPlayers;
    }

    isTerminal() {
        const combinations = [
            [0, 1, 2],
            [3, 4, 7],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        ]
        let isGameOver = false;
        combinations.forEach((combination) => {
            const boardCombination = combination.map((location) => {
                return this.board[location];
            })

            if (boardCombination[0] !== ' ' &&
                boardCombination[0] === boardCombination[1] &&
                boardCombination[1] === boardCombination[2]) {
                isGameOver = true;
            }
        })
        if (isGameOver) {
            return true;
        }

        if (!this.board.includes(' ')) {
            return true;
        }

        return false;
    }

    stateInformation() {
        let output = '```';
        this.board.forEach((tile, index) => {
            if ((index + 1) % 3 === 0) {
                output = `${output} ${tile} \n`;
                if (index != 8) {
                    output = `${output}-----------\n`;
                }
            }
            else {
                output = `${output} ${tile} |`;
            }
        });
        output = `${output}\`\`\``
        return output;
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
class Game {
    constructor(players) {
        this.players = players
    }
    
    newInstance() {
        throw 'Not implemented';
    }
}

class GameInstance {
    constructor(players) {
        this.players = players
    }

    applyAction(action) {
        throw 'Not implemented';
    }

    isTerminal() {
        throw 'Not implemented';
    }

    legalActions() {
        throw 'Not implemented';
    }

    messageToAction(message) {
        throw 'Not implemented';
    }
    
    stateInformation() {
        throw 'Not implemented';
    }

    getCurrentPlayer() {
        throw 'Not implemented';
    }
}

module.exports = {
    Game, GameInstance
}
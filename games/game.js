class Game {
  constructor() {
    this._games = {};
  }

  newInstance(channel, players) {
    throw new Error('Not implemented');
  }

  getGame(channel, player) {
    return this._games[channel][player];
  }
}

class GameInstance {
  constructor(players) {
    this.players = players;
  }

  isTerminal() {
    throw new Error('Not implemented');
  }

  /* eslint-disable no-unused-vars */
  messageToAction(message) {
    // eslint-disable-line no-unused-vars
    throw new Error('Not implemented');
  }

  applyAction(action) {
    // eslint-disable-line no-unused-vars
    throw new Error('Not implemented');
  }
  /* eslint-enable no-unused-vars */

  stateInformation() {
    throw new Error('Not implemented');
  }

  getCurrentPlayer() {
    throw new Error('Not implemented');
  }
}

module.exports = {
  Game,
  GameInstance,
};

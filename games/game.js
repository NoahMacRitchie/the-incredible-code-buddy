class Game {
  constructor(players) {
    this.players = players;
  }

  newInstance() {
    throw new Error('Not implemented');
  }
}

class GameInstance {
  constructor(players) {
    this.players = players;
  }

  isTerminal() {
    throw new Error('Not implemented');
  }

  legalActions() {
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

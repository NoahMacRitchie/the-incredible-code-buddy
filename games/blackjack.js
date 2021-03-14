const {Game, GameInstance} = require('./game')

class Blackjack extends Game {
    constructor() {
        super();
    }
    
    newInstance(channel, players) {
        const gameInstance = new BlackjackInstance(players);
        players.forEach((player) => {
            this._games[channel] = this._games[channel] || {};
            this._games[channel][player] = gameInstance;
        });
        return gameInstance;
    }
}

class BlackjackInstance extends GameInstance {
    constructor(players) {
        super(players);
        this.cards = [
            'A♢', '2♢', '3♢', '4♢', '5♢', '6♢', '7♢', '8♢', '9♢', '10♢', 'J♢', 'Q♢', 'K♢',     
            'A♧', '2♧', '3♧', '4♧', '5♧', '6♧', '7♧', '8♧', '9♧', '10♧', 'J♧', 'Q♧', 'K♧',     
            'A♡', '2♡', '3♡', '4♡', '5♡', '6♡', '7♡', '8♡', '9♡', '10♡', 'J♡', 'Q♡', 'K♡',     
            'A♤', '2♤', '3♤', '4♤', '5♤', '6♤', '7♤', '8♤', '9♤', '10♤', 'J♤', 'Q♤', 'K♤',     
        ];
        this.hands = [[], []];
        this.playerHand = this.hands[0];
        this.dealerHand = this.hands[1];

        this.playerMove = -1;
        this.currentPlayer = 0;
        this.numPlayers = this.players.length + 1; // dealer == 1
        
        startup(this.playerHand, this.dealerHand, this.cards);
        this.handTotals = [0, 0];
        this.handTotals[0] = getHandBestTotal(this.playerHand);
        this.handTotals[1] = getHandBestTotal(this.dealerHand);
    }

    applyAction(action) {
        if (action == 0) {
            const draw = Math.floor(Math.random() * Math.floor(this.cards.length));
            const drawnCard = this.cards.splice(draw, 1);
            this.hands[this.currentPlayer].push(drawnCard[0]);
            this.handTotals[this.currentPlayer] = getHandBestTotal(this.hands[this.currentPlayer]);
        }
        else if (action == 1) {
            this.currentPlayer = 1;
            while(this.handTotals[1] < 17) {
                this.applyAction(0);
                this.currentPlayer = 1;
            }
        }
    }

    isTerminal() {
        if (this.handTotals[0] === 21 && this.handTotals[1] !== 21) {
            return true;
        }

        if (this.handTotals[0] !== 21 && this.handTotals[1] === 21) {
            return true;
        }

        if (this.handTotals[0] === 21 && this.handTotals[1] !== 21) {
            return true;
        }

        if (this.handTotals[0] > 21) {
            return true;
        }
        
        if (this.handTotals[1] > 21) {
            return true;
        }

        if (this.playerMove === 1) {
            return true;
        }

        return false;
    }

    stateInformation() {
        const hand = JSON.stringify(this.playerHand);
        const handTotals = getHandTotal(this.playerHand);
        const handSmall = handTotals.hand[0];
        const handBig = handTotals.hand[1];

        const dealerHand = JSON.stringify(this.dealerHand);
        const dealerHandTotals = getHandTotal(this.dealerHand);
        const dealerHandSmall = dealerHandTotals.hand[0];
        const dealerHandBig = dealerHandTotals.hand[1];

        let hiddenDealerHand = [...this.dealerHand];
        hiddenDealerHand[hiddenDealerHand.length - 1] = '?';
        hiddenDealerHand = JSON.stringify(hiddenDealerHand);

        let output = '';
        if (this.isTerminal()) {
            if (dealerHandBig <= 21) {
                output += `Dealer hand: ${dealerHand} (${dealerHandBig})\n`;
            }
            else {
                output += `Dealer hand: ${dealerHand} (${dealerHandSmall})\n`;
            }
        }
        else {
            output += `Dealer hand: ${hiddenDealerHand}\n`;
        }
        if (handSmall !== handBig && handBig <= 21) {
            output += `Your hand: ${hand} (${handSmall}/${handBig})\n`;
        }
        else {
            output += `Your hand: ${hand} (${handSmall})\n`;
        }

        if (this.isTerminal()) {
            const win = this.handTotals[1] > 21 || this.handTotals[0] <= 21 && this.handTotals[0] > this.handTotals[1];
            const lose = this.handTotals[0] > 21 ||  this.handTotals[1] <= 21 && this.handTotals[1] > this.handTotals[0];
            const playerBlackjack = this.handTotals[0] === 21 && this.handTotals[1] !== 21;
            const dealerBlackjack = this.handTotals[1] === 21 && this.handTotals[0] !== 21;

            const result = playerBlackjack ? 'Blackjack! :rocket:' :
                dealerBlackjack ? 'Dealer blackjack. :rock:' :
                lose ? `Lose! :x:`: 
                win ? 'Win! :money_with_wings:' : 
                'Tie :robot_face:';
            output = `${output}${result}`;
        }
        return output;
    }

    messageToAction(message) {
        switch(message) {
            case 'hit':
                this.playerMove = 0;
                return 0;
            case 'stay':
            default:
                this.playerMove = 1;
                return 1;
        };
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }
}

const startup = (hand, dealerHand, cards) => {
    for (let i = 0; i < 2; ++i) {
        const dealerDraw = Math.floor(Math.random() * Math.floor(cards.length));
        const dealerDrawnCard = cards.splice(dealerDraw, 1);
        dealerHand.push(dealerDrawnCard[0]);

        const draw = Math.floor(Math.random() * Math.floor(cards.length));
        const drawnCard = cards.splice(draw, 1);
        hand.push(drawnCard[0]);
    }
}

const getHandTotal = (hand) => {
    let handSmall = 0;
    let handBig = 0;
    hand.forEach((card) => {
        const cardVal = card.substring(0, card.length - 1);
        switch(cardVal) {
            case 'A':
                handSmall++;
                handBig += 11;
                break;
            case 'J':
            case 'Q':
            case 'K':
                handSmall += 10;
                handBig += 10;                
                break;
            default:
                handSmall += parseInt(cardVal);
                handBig += parseInt(cardVal);
        }
    });
    return {hand: [handSmall, handBig]};
}

const getHandBestTotal = (hand) => {
    const handTotal = getHandTotal(hand);
    if (handTotal.hand[1] <= 21) {
        return handTotal.hand[1];
    }
    return handTotal.hand[0];
}

module.exports = {
    Blackjack, BlackjackInstance
}
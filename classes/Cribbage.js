import Deck from './Deck';
import Hand from './Hand';

export default class Cribbage {
    constructor() {
        this.deck = new Deck();
        this.hands = {
            1: new Hand(),
            2: new Hand()
        }
        this.cut = null;
    }

    dealCards() {
        for (let i=0;i<6;i++) {
            for (let j=1;j<=2;j++) {
                this.hands[j].addCard(this.deck.cards.shift());
            }
        }
        this.cut = this.deck.cards.shift();
    }
}
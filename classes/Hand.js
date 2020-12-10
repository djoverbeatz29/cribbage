import totalHandScore from '../totalHandScore';
import Deck from './Deck';

class Hand {
    constructor() {
        this.hand = [];
    }

    score(cards=this.hand) {
        return totalHandScore(cards);
    }

    addCard(card) {
        this.hand.push(card);
    }

    simulateSub(indices) {
        const handCards = indices.map(ix=>this.hand[ix]);
        const sampCards = (new Deck()).cards;
        const others = sampCards.filter(card=>!handCards.find(handCard=>card.rank===handCard.rank && card.suit===handCard.suit));
        const scores = others.map(otherCard=>this.score(handCards.concat(otherCard)));
        return scores.reduce((card,sum)=>card+sum, 0) / scores.length;
    }
}
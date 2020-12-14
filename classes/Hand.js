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

    expectedValue(indices) {
        const handCards = indices.map(ix=>this.hand[ix]);
        const sampCards = (new Deck()).cards;
        const others = sampCards.filter(card=>!handCards.find(handCard=>card.rank===handCard.rank && card.suit===handCard.suit));
        const scores = others.map(otherCard=>this.score(handCards.concat(otherCard)));
        return scores.reduce((card,sum)=>card+sum, 0) / scores.length;
    }

    allHandExpectedValues() {
        const samples = [];
        for (let i=0;i<this.hand.length;i++) {
            for (let j=i+1; j<this.hand.length;j++) {
                const myIndices = [...Array(this.hand.length).keys].filter(ix=>ix!==i && ix!==j);
                const handEV = this.expectedValue(myIndices);
                const handString = myIndices.map(ix=>this.hand[ix].showCard()).join('-');
                samples.push([handString, handEV]);
                console.log(`${handString}: ${handEV}`);
            }
        }
        return samples;
    }

}
import totalHandScore from '../totalHandScore';
import Deck from './Deck';

export default class Hand {
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
        const n = this.hand.length;
        for (let i=0;i<n;i++) {
            for (let j=i+1; j<n;j++) {
                const myIndices = [...Array(n).keys()].filter(ix=>ix!==i && ix!==j);
                const handEV = this.expectedValue(myIndices);
                const handString = myIndices.map(ix=>this.hand[ix].showCard()).join('-');
                samples.push([handString, handEV]);
                console.log(`${handString}: ${handEV}`);
            }
        }
        return samples.reduce((max,item)=>item[1]>max[1]?item:max,[0,0]);
    }

}
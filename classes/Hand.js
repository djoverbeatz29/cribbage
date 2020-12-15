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

    expectedValue(handIndices, cribIndices, dealer=true) {
        const handCards = handIndices.map(ix=>this.hand[ix]);
        const cribCards = cribIndices.map(ix=>this.hand[ix]);
        const sampCards = (new Deck()).cards;
        const others = sampCards.filter(card=>!handCards.find(handCard=>card.rank===handCard.rank && card.suit===handCard.suit));
        const scores = [];
        for (let i=0;i<others.length;i++) {
            const otherCard = others[i];
            const handScore = this.score(handCards.concat(otherCard));
            const otherIndices = [...Array(others.length).keys()];
            otherIndices.splice(i,1);
            cribScores = [];
            for (let n=0;n<100;n++) {
                const randos = [];
                for (let j=0; j<1; j++) {
                    randos.concat(otherIndices.splice(Math.floor(Math.random()*otherIndices.length),1));
                }
                randoCards = randos.map(ix=>others[ix]);
                cribScores.push(this.score(cribCards.concat(randoCards).concat(otherCard)));
            }
            const cribEV = cribScores.reduce((card,sum)=>card+sum, 0) / cribScores.length;
            scores.push(handScore + cribScores * (dealer ? 1 : -1));
        }
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
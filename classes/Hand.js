import totalHandScore from '../totalHandScore';
import Deck from './Deck';

export default class Hand {
    constructor(isDealer=true) {
        this.hand = [];
        this.isDealer = isDealer
    }

    score(cards=this.hand) {
        return totalHandScore(cards);
    }

    addCard(card) {
        this.hand.push(card);
    }

    expectedValue(handIndices) {
        const n = this.hand.length;
        const cribIndices = [...Array(n).keys()].filter(i=>!handIndices.find(ix=>ix===i));
        const handCards = handIndices.map(ix=>this.hand[ix]);
        const cribCards = cribIndices.map(ix=>this.hand[ix]);
        const sampCards = (new Deck()).cards;
        const others = sampCards.filter(card=>!handCards.find(handCard=>card.rank===handCard.rank && card.suit===handCard.suit));
        const scores = [];
        for (let i=0;i<others.length;i++) {
            const othersCopy = JSON.parse(JSON.stringify(others));
            const otherCard = othersCopy[i];
            const handScore = this.score(handCards.concat(otherCard));
            const cribScores = [];
            for (let r=0; r<50; r++) {
                const randoCards = [];
                for (let j=0; j<1; j++) {
                    randoCards.concat(othersCopy.splice(Math.floor(Math.random()*othersCopy.length),1));
                }
                cribScores.push(this.score(cribCards.concat(randoCards).concat(otherCard)));
            }
            const cribEV = cribScores.reduce((card,sum)=>card+sum, 0) / cribScores.length;
            scores.push({
                "handScore": handScore,
                "cribScore": cribEV * (this.isDealer ? 1 : -1)
            });
        }
        const hands = scores.map(ob=>ob.handScore);
        const cribs = scores.map(ob=>ob.cribScore);
        return {
            "handEV": hands.reduce((card,sum)=>card+sum, 0) / scores.length,
            "cribEV": cribs.reduce((card,sum)=>card+sum, 0) / cribs.length
        };
    }

    allHandExpectedValues() {
        const samples = [];
        const n = this.hand.length;
        for (let i=0;i<n;i++) {
            for (let j=i+1; j<n;j++) {
                const myIndices = [...Array(n).keys()].filter(ix=>ix!==i && ix!==j);
                const cribIndices = [i,j];
                const handEV = this.expectedValue(myIndices);
                const handString = myIndices.map(ix=>this.hand[ix].showCard()).join('-');
                samples.push([handString, handEV]);
                console.log(`${handString}: ${handEV.handEV + handEV.cribEV}`);
            }
        }
        // return samples.reduce((max,item)=>item[1]>max[1]?item:max,[0,0]);
        return samples;
    }

}
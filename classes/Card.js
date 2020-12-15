export default class Card {
    constructor(suit='S',rank='A') {
        this.suit = suit;
        this.rank = rank;
        this.score = this.getScore();
    }

    getScore() {
        const rank = this.rank;
        if (rank==='A') return 1;
        else if (['T','J','Q','K'].find(c=>c===rank)) return 10;
        else return parseInt(rank);
    }

    showCard() {
        return `${this.rank}${this.suit}`;
    }

}
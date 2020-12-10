export default class Deck {
    constructor() {
        this.cards = [];
        this.fillDeck();
        this.shuffle();
    }

    fillDeck() {
        ['A','2','3','4','5','6','7','8','9','T','J','Q','K'].forEach(rank=>['C','D','H','S'].forEach(suit=>this.cards.push(new Card(suit,rank))));
    }

    shuffle() {
        for (let i=51;i>=0;i--) {
            this.cards.push(this.cards.splice(Math.floor(Math.random()*i),1)[0]);
        }
    }

}
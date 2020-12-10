import counter from './counter';

export default function dupes(hand) {
    hand = hand.map(card=>card.suit);
    hand = counter(hand);
    const max = Math.max(...hand);
    return max >= 4 ? max : 0;
}
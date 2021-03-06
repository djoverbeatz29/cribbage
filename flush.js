import counter from './counter';

export default function flush(hand) {
    hand = hand.map(card=>card.suit);
    hand = counter(hand);
    const max = Math.max(...Object.values(hand));
    return max >= 4 ? max : 0;
}
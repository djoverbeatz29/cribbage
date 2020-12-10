import counter from './counter';

export default function dupes(hand) {
    hand = hand.map(card=>card.score());
    let points = 0;
    const counts = counter(hand);
    Object.values(counts).forEach(count=>{
        if (count===2) points += 2;
        else if (count===3) points += 6;
        else if (count===4) points += 12;
    })
    return points;
}
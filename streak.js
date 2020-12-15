export default function streak(hand) {
    let len = 1;
    let streaks=[];
    hand = hand.map(card=>card.score);
    for (let i=1;i<hand.length;i++) {
        if (hand[i]===hand[i-1]+1) {
            len += 1;
            if (i===hand.length-1) streaks.push(len);
        }
        else {
            streaks.push(len);
            len = 1;
        }
    }
    const max = Math.max(...streaks);
    return max >= 3 ? max : 0;
}
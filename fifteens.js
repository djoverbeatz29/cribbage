export default function fifteens(hand) {
    const len = hand.length;
    let sums=0;
    hand = hand.map(card=>card.score).sort((a,b)=>a>b?1:-1);
    for (let i=0;i<len;i++) {
        for (let j=i+1;j<len;j++) {
            if (hand[i]+hand[j]===15) sums+=2;
            for (let k=j+1;k<len;k++) {
                if (hand[i]+hand[j]+hand[k]===15) sums+=2;
                for (let m=k+1;m<len;m++) {
                    if (hand[i]+hand[j]+hand[k]+hand[m]===15) sums+=2;
                    for (let n=m+1;n<len;n++) {
                         if (hand[i]+hand[j]+hand[k]+hand[m]+hand[n]===15) sums+=2;
                    }
                }
            }
        }
    }
    return sums;
}
export default function fifteens(hand) {
    let sums=0;
    hand = hand.map(card=>card.score()).sort((a,b)=>a>b?1:-1);
    for (let i=0;i<hand.length;i++) {
        for (let j=i+1;j<hand.length;j++) {
            if (hand[i]+hand[j]===15) sums+=1;
            for (let k=j+1;k<hand.length;k++) {
                if (hand[i]+hand[j]+hand[k]===15) sums+=1;
                for (let m=k+1;m<hand.length;m++) {
                    if (hand[i]+hand[j]+hand[k]+hand[m]===15) sums+=1;
                    for (let n=m+1;n<hand.length;n++) {
                         if (hand[i]+hand[j]+hand[k]+hand[m]+hand[n]===15) sums+=1;
                    }
                }
            }
        }
    }
    return sums * 2;
}
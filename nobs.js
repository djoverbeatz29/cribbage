export default function nobs(cards) {
    const cut = cards.pop();
    return cards.find(card=>card.rank==='J' && card.suit===cut.suit) ? 1 : 0;
}
export default function counter(hand) {
    return hand.reduce((dict,ch)=>(dict[ch]=dict[ch]+1||1,dict),{});
}
import fifteens from './fifteens';
import dupes from './dupes';
import flush from './flush';
import streak from './streak';

export default function totalHandScore(hand) {
   return fifteens(hand)+dupes(hand)+flush(hand)+streak(hand);
}
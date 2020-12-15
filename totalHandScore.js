import fifteens from './fifteens';
import dupes from './dupes';
import flush from './flush';
import streak from './streak';
import nobs from './nobs';

export default function totalHandScore(hand) {
   return fifteens(hand)+dupes(hand)+flush(hand)+streak(hand)+nobs(hand);
}
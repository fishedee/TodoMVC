import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import Rx from 'rxjs/Rx';

function Store(){
	var result = new Rx.BehaviorSubject(SHOW_ALL);
	return result;
}

export default Store();
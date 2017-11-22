import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import Rx from 'rxjs/Rx';

function Store(actions){
	var modAction = actions.filter(action=>action.type=="MOD_FILTER")
		.map(action=>function(filter){
			return action.payload.data;
		})
	
	var result = Rx.Observable
		.merge(modAction)
		.scan((filter,operator)=>operator(filter),SHOW_ALL)
		.startWith(SHOW_ALL)
		.publishReplay()
	  	.refCount()
	 return result;
}

export default Store;
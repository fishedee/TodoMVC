import Rx from 'rxjs/Rx';
import Todos from './todos';
import Filter from './filter';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

function Store(Todos,Filter){
	var result = Rx.Observable
		.combineLatest(Todos,Filter,function(todos, filter) {
			const TODO_FILTERS = {
			  [SHOW_ALL]: () => true,
			  [SHOW_ACTIVE]: todo => !todo.get('completed'),
			  [SHOW_COMPLETED]: todo => todo.get('completed')
			};
			return todos.filter(TODO_FILTERS[filter]);
		});
	return result;
}

export default Store(Todos,Filter);
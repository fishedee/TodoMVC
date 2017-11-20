import Rx from 'rxjs/Rx';
import Todos from './todos';
import Filter from './filter';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

let FilterTodos = {
	init(){
		this.subject = Rx.Observable.combineLatest(Todos.getSubject(),Filter.getSubject(),function(todos, filter) {
			const TODO_FILTERS = {
			  [SHOW_ALL]: () => true,
			  [SHOW_ACTIVE]: todo => !todo.get('completed'),
			  [SHOW_COMPLETED]: todo => todo.get('completed')
			};
			return todos.filter(TODO_FILTERS[filter]);
		})
	},
	getSubject(){
		return this.subject;
	},
};

FilterTodos.init();

export default FilterTodos;
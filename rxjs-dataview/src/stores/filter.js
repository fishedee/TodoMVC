import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import Rx from 'rxjs/Rx';

let Todos = {
	init(){
		this.state = SHOW_ALL;
		this.subject = new Rx.BehaviorSubject(this.state);
	},
	fireListener(){
		this.subject.next(this.state);
	},
	set(type){
		this.state = type;
		this.fireListener();
	},
	get(){
		return this.state;
	},
	getSubject(){
		return this.subject;
	},
};

Todos.init();

export default Todos;
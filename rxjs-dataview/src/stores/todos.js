import Immutable from "immutable";
import Rx from 'rxjs/Rx';

let Todos = {
	init(){
		this.state = Immutable.fromJS([]);
		this.subject = new Rx.BehaviorSubject(this.state);
	},
	fireListener(){
		this.subject.next(this.state);
	},
	addTodo(text){
		let id = this.state.reduce(
		  (maxId,todo)=>Math.max(maxId,todo.get('id')),
		  -1
		) + 1;
		this.state = this.state.push(Immutable.fromJS({
		  text:text,
		  id:id,
		  completed:false
		}));
		this.fireListener();
	},
	deleteTodo(id){
		this.state = this.state.filter(
		  (todo)=>todo.get('id') != id
		);
		this.fireListener();
	},
	editTodo(id,text){
		this.state = this.state.map(
		  (todo)=>todo.get('id')!=id?todo:todo.set('text',text)
		);
		this.fireListener();
	},
	completeTodo(id){
		this.state = this.state.map(
		  (todo)=>todo.get('id')!=id?todo:todo.update('completed',(completed)=>!completed)
		);
		this.fireListener();
	},
	completeAll(){
		let areAllMarked = this.state.every(
		  (todo)=>todo.get('completed')
		);
		this.state = this.state.map(
		  (todo)=>todo.set('completed',!areAllMarked)
		);
		this.fireListener();
	},
	clearCompleted(){
		this.state = this.state.filter(
		  (todo)=>!todo.get('completed')
		)
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
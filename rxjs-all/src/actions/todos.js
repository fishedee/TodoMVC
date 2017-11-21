import Rx from 'rxjs/Rx';
import Todos from '../stores/todos';
import Immutable from "immutable";

function Action(Todos){
	var addTodo = new Rx.Subject();
	var deleteTodo = new Rx.Subject();
	var editTodo = new Rx.Subject();
	var completeTodo = new Rx.Subject();
	var completeAll = new Rx.Subject();
	var clearCompleted = new Rx.Subject();

	addTodo.subscribe(function(data){
		console.log(data);
	});
	addTodo.withLatestFrom(Todos,function(text,todos){
		console.log("12");
		let id = todos.reduce(
		  (maxId,todo)=>Math.max(maxId,todo.get('id')),
		  -1
		) + 1;
		return todos.push(Immutable.fromJS({
		  text:text,
		  id:id,
		  completed:false
		}));
	}).subscribe(Todos);
	
	deleteTodo.withLatestFrom(Todos,function(id,todos){
		return todos.filter(
		  (todo)=>todo.get('id') != id
		);
	}).subscribe(Todos);

	editTodo.withLatestFrom(Todos,function([id,text],todos){
		return todos.map(
		  (todo)=>todo.get('id')!=id?todo:todo.set('text',text)
		);
	}).subscribe(Todos);

	completeTodo.withLatestFrom(Todos,function(id,todos){
		return todos.map(
		  (todo)=>todo.get('id')!=id?todo:todo.update('completed',(completed)=>!completed)
		);
	}).subscribe(Todos);

	completeAll.withLatestFrom(Todos,function(_,todos){
		let areAllMarked = todos.every(
		  (todo)=>todo.get('completed')
		);
		return todos.map(
		  (todo)=>todo.set('completed',!areAllMarked)
		);
	}).subscribe(Todos);

	clearCompleted.withLatestFrom(Todos,function(_,todos){
		return todos.filter(
		  (todo)=>!todo.get('completed')
		);
	}).subscribe(Todos);
	return {
		addTodo,
		deleteTodo,
		editTodo,
		completeTodo,
		completeAll,
		clearCompleted,
	};
}

export default Action(Todos);
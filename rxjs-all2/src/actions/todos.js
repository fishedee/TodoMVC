import Rx from 'rxjs/Rx';
import Immutable from "immutable";

function Action(Todos){
	var addTodo = new Rx.Subject();
	var deleteTodo = new Rx.Subject();
	var editTodo = new Rx.Subject();
	var completeTodo = new Rx.Subject();
	var completeAll = new Rx.Subject();
	var clearCompleted = new Rx.Subject();

	var addTodoAction = addTodo
		.map((data)=>{
			return {
				type:"ADD_TODO",
				payload:{
					text:data,
				}
			}
		})

	var deleteTodoAction = deleteTodo
		.map((data)=>{
			return {
				type:"DEL_TODO",
				payload:{
					id:data,
				}
			}
		})
	
	var editTodoAction = editTodo
		.map(([id,text])=>{
			return {
				type:"MOD_TODO",
				payload:{
					id:id,
					key:"text",
					value:text,
				}
			}
		})

	var completeTodoAction = completeTodo
		.withLatestFrom(Todos,function(id,todos){
			return todos.filter((todo)=>todo.get('id')==id)
		})
		.filter(function(todos){
			return todos.size != 0;
		})
		.map((todo)=>{
			return {
				type:"MOD_TODO",
				payload:{
					id:todo.getIn([0,'id']),
					key:"completed",
					value:!todo.getIn([0,"completed"]),
				}
			}
		})

	var completeAllAction = completeAll
		.withLatestFrom(Todos,function(_,todos){
			return todos.every(
			  (todo)=>todo.get('completed')
			);
		})
		.map((areAllMarked)=>{
			return {
				type:"MODALL_TODO",
				payload:{
					key:"completed",
					value:!areAllMarked,
				}
			}
		})

	var clearCompletedAction = clearCompleted
		.withLatestFrom(Todos,function(_,todos){
			return todos.filter(
			  (todo)=>todo.get('completed')
			);
		})
		.mergeMap((todos)=>{
			return Rx.Observable.from(todos.map((todo)=>{
				return {
					type:"DEL_TODO",
					payload:{
						id:todo.get('id'),
					}
				};
			}).toJS());
		})

	var actions = Rx.Observable
		.merge(addTodoAction,
			deleteTodoAction,
			editTodoAction,
			completeTodoAction,
			completeAllAction,
			clearCompletedAction);
	return {
		addTodo,
		deleteTodo,
		editTodo,
		completeTodo,
		completeAll,
		clearCompleted,
		actions,
	};
}

export default Action;
import Immutable from "immutable";
import Rx from 'rxjs/Rx';

function Store(actions){
	var addAction = actions.filter(action=>action.type=="ADD_TODO")
		.map(action=>function(todos){
			let id = todos.reduce(
			  (maxId,todo)=>Math.max(maxId,todo.get('id')),
			  -1
			) + 1;
			return todos.push(Immutable.fromJS({
			  text:action.payload.text,
			  id:id,
			  completed:false
			}));
		})
	var delAction = actions.filter(action=>action.type == "DEL_TODO")
		.map(action=>function(todos){
			return todos.filter(
			  (todo)=>todo.get('id') != action.payload.id
			);
		})
	var modAction = actions.filter(action=>action.type == "MOD_TODO")
		.map(action=>function(todos){
			var result = todos.map(function(todo){
	  			if(todo.get('id')!=action.payload.id){
	  				return todo;
	  			}
	  			return todo.set(action.payload.key,action.payload.value)
			});
			return result;
		})
	var modAllAction = actions.filter(action=>action.type == "MODALL_TODO")
		.map(action=>function(todos){
			return todos.map(
			  (todo)=>todo.set(action.payload.key,action.payload.value)
			);
		})

	var result = Rx.Observable
		.merge(addAction,
			delAction,
			modAction,
			modAllAction)
		.scan((todos,operator)=>{
			var result = operator(todos);
			return result;
		},Immutable.fromJS([]))
		.startWith(Immutable.fromJS([]))
	return result;
}

export default Store;
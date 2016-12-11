import Todos from '../models/todos';
import Log from '../models/log';

function addTodo(text){
	Log.addCount();
	Todos.addTodo(text);
}
function deleteTodo(id){
	Log.addCount();
	Todos.deleteTodo(id);
}
function editTodo(id,text){
	Log.addCount();
	Todos.editTodo(id,text);
}
function completeTodo(id){
	Log.addCount();
	Todos.completeTodo(id);
}
function completeAll(){
	Log.addCount();
	Todos.completeAll();
}
function clearCompleted(){
	Log.addCount();
	Todos.clearCompleted();
}

export default {
	addTodo:addTodo,
	deleteTodo:deleteTodo,
	editTodo:editTodo,
	completeTodo:completeTodo,
	completeAll:completeAll,
	clearCompleted:clearCompleted,
}
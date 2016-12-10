import Todos from '../models/todos';
import Log from '../models/log';

let AppController = {
  addTodo(text){
    Log.addCount();
    Todos.addTodo(text);
  },
  deleteTodo(id){
    Log.addCount();
    Todos.deleteTodo(id);
  },
  editTodo(id,text){
    Log.addCount();
    Todos.editTodo(id,text);
  },
  completeTodo(id){
    Log.addCount();
    Todos.completeTodo(id);
  },
  completeAll(){
    Log.addCount();
    Todos.completeAll();
  },
  clearCompleted(){
    Log.addCount();
    Todos.clearCompleted();
  },
}

export default AppController;
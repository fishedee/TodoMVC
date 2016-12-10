import React from 'react';
import Todos from '../models/todos';
import Log from '../models/log';
import AppView from '../views/app';

let App = React.createClass({
  getInitialState(){
    Todos.addListener(()=>{
      this.setState({});
    });
    Log.addListener(()=>{
      this.setState({});
    });
    return {};
  },
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
  render() {
    return (
      <AppView
        count={Log.get()}
        todos={Todos.get()}
        addTodo={this.addTodo}
        clearCompleted={this.clearCompleted} 
        completeAll={this.completeAll}
        completeTodo={this.completeTodo}
        deleteTodo={this.deleteTodo}
        editTodo={this.editTodo}
      />
    );
  }
});

export default App;
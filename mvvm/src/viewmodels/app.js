import React from 'react';
import AppView from '../views/app';
import LinkState from './linkState';

let App = React.createClass({
  getInitialState(){
    return LinkState(this,'data',{
        count:0,
        todos:[]
    });
  },
  addLogCount(){
    this.state.data.count++;
  },
  completeTodo(index){
    var todo = this.state.data.todos[index];
    todo.completed = !todo.completed;
  },
  completeAll(){
    this.addLogCount();
    var todos = this.state.data.todos;
    var areAllMarked = true;
    for( var i in todos ){
      if(todos[i].completed == false){
        areAllMarked = false;
        break;
      }
    }
    for( var i in todos ){
      todos[i].completed = !areAllMarked;
    }
  },
  clearCompleted(){
    var todos = this.state.data.todos;
    var newTodos = [];
    for(var i in todos ){
      if( !todos[i].completed ){
        newTodos.push(todos[i]);
      }
    }
    this.state.data.todos = newTodos;
  },
  render() {
    console.log(this.state.data);
    return (
      <AppView
        data={this.state.data}
        clearCompleted={this.clearCompleted} 
        completeAll={this.completeAll}
        completeTodo={this.completeTodo}
      />
    );
  }
});

export default App;
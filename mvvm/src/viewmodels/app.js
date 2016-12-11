import React from 'react';
import AppView from '../views/app';
import LinkState from './linkState';

let App = React.createClass({
  getInitialState(){
    return LinkState(this,'data',{
        count:0,
        todos:[
          {
            completed:false,
            text:'mm',
            id:1000,
          }

        ]
    });
  },
  addLogCount(){
    this.state.data.count++;
  },
  completeTodo(index){
    var todo = this.state.data.todos[index];
    todo.completed = !todo.completed
  },
  completeAll(){
    this.addLogCount();
    var todos = this.state.data.todos;
    var areAllMarked = true;
    for( var [i,todo] of todos ){
      if(todo.completed == false){
        areAllMarked = false;
        break;
      }
    }
    for( var [i,todo] of todos ){
      todo.completed = !areAllMarked;
    }
  },
  clearCompleted(){
    var todos = this.state.data.todos;
    var newTodos = [];
    for(var [i,todo] of todos ){
      if( !todo.completed ){
        newTodos.push(todos[i]);
      }
    }
    this.state.data.todos = newTodos;
  },
  render() {
    console.log(this.state.data.todos);
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
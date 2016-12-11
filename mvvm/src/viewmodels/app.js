import React from 'react';
import AppView from '../views/app';
import LinkState from './linkState';
import Immutable from 'immutable';

let App = React.createClass({
  getInitialState(){
    return LinkState(this,'data',Immutable.fromJS({
        count:0,
        todos:[]
    }));
  },
  addLogCount(){
    var count = this.state.data.link('count');
    count.change(count.value+1);
  },
  completeTodo(index){
    this.addLogCount();
    var completed = this.state.data.link('todos').link(index).link('completed');
    completed.change(!completed.value);
  },
  completeAll(){
    this.addLogCount();
    var todos = this.state.data.link('todos');
    var areAllMarked = true;
    for( var i  = 0 ; i != todos.size ; i++ ){
      if(todos.get(i).get('completed') == false){
        areAllMarked = false;
        break;
      }
    }
    var newTodos = todos.map(function(todo) {
        return todo.set('completed',!areAllMarked);
    })
    todos.change(newTodos);
  },
  clearCompleted(){
    this.addLogCount();
    var todos = this.state.data.link('todos');
    var newTodos = todos.filter(
        (todo)=>!todo.get('completed')
    );
    todos.change(newTodos);
  },
  render() {
    console.log(this.state.data.toJS());
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
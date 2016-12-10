import React from 'react';
import AppView from '../views/app';
import BindData from './bindData';

let App = React.createClass({
  mixins:[BindData],
  addLogCount(){
    this.state.data = this.state.data.updateIn(['count'],function(count){
      return count+1;
    })
    this.setState({});
  },
  completeTodo(index){
    this.addLogCount();
    this.state.data = this.state.data.updateIn(['todos',index,'completed'],function(completed){
      return !completed;
    });
    this.setState({});
  },
  completeAll(){
    this.addLogCount();
    this.state.data = this.state.data.updateIn(['todos'],function(todos){
      let areAllMarked = todos.every(
        (todo)=>todo.get('completed')
      );
      todos = todos.map(
        (todo)=>todo.set('completed',!areAllMarked)
      );
      return todos;
    });
    this.setState({});
  },
  clearCompleted(){
    this.addLogCount();
    this.state.data = this.state.data.updateIn(['todos'],function(todos){
      todos = todos.filter(
        (todo)=>!todo.get('completed')
      );
      return todos;
    });
    this.setState({});
  },
  render() {
    return (
      <AppView
        data={this.state.data}
        onDataChange={this.onDataChange}
        clearCompleted={this.clearCompleted} 
        completeAll={this.completeAll}
        completeTodo={this.completeTodo}
      />
    );
  }
});

export default App;
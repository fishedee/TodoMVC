import React from 'react';
import Header from './Header';
import MainSection from './MainSection';
import Todos from '../models/todos';
import Log from '../models/log';
import AppController from '../controllers/appcontroller';

let App = React.createClass({
  getInitialState(){
    Todos.addListener(()=>{
      this.setState({todos:Todos.get()});
    });
    Log.addListener(()=>{
      this.setState({count:Log.get()});
    });
    return {
      todos:Todos.get(),
      count:Log.get(),
    };
  },
  render() {
    var action = {
      deleteTodo:AppController.deleteTodo,
      editTodo:AppController.editTodo,
      completeTodo:AppController.completeTodo,
      completeAll:AppController.completeAll,
      clearCompleted:AppController.clearCompleted,
    };
    return (
      <div>
        <div>操作次数:{this.state.count}</div>
        <Header addTodo={AppController.addTodo} />
        <MainSection todos={this.state.todos} actions={action} />
      </div>
    );
  }
});

export default App;
import React from 'react';
import Todos from '../models/todos';
import Log from '../models/log';
import Actions from '../actions/actions';
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
  render() {
    return (
      <AppView
        count={Log.get()}
        todos={Todos.get()}
        addTodo={Actions.addTodo}
        clearCompleted={Actions.clearCompleted} 
        completeAll={Actions.completeAll}
        completeTodo={Actions.completeTodo}
        deleteTodo={Actions.deleteTodo}
        editTodo={Actions.editTodo}
      />
    );
  }
});

export default App;
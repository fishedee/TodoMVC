import React from 'react';
import AppView from '../components/app';
import Store from './store';
import Dispatcher from './dispatcher';
import {addTodo,clearCompleted,completeAll,completeTodo,deleteTodo,editTodo} from '../actions/actions';

function createActionDispatch(action){
  return function(){
    var doing = action.apply(null,arguments);
    Dispatcher(doing);
  }
}

let App = React.createClass({
  getInitialState(){
    Store.addListener(()=>{
      this.setState({});
    });
    return {};
  },
  render() {
    return (
      <AppView
        count={Store.get().count}
        todos={Store.get().todos}
        addTodo={createActionDispatch(addTodo)}
        clearCompleted={createActionDispatch(clearCompleted)} 
        completeAll={createActionDispatch(completeAll)}
        completeTodo={createActionDispatch(completeTodo)}
        deleteTodo={createActionDispatch(deleteTodo)}
        editTodo={createActionDispatch(editTodo)}
      />
    );
  }
});

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './views/Header';
import MainSection from './views/MainSection';
import Todos from './models/todos';
import './index.css';

let App = React.createClass({
  getInitialState(){
    Todos.addListener(()=>{
      this.setState({todos:Todos.get()});
    });
    return {
      todos:Todos.get(),
    };
  },
  addTodo(text){
    Todos.addTodo(text);
  },
  deleteTodo(id){
    Todos.deleteTodo(id);
  },
  editTodo(id,text){
    Todos.editTodo(id,text);
  },
  completeTodo(id){
    Todos.completeTodo(id);
  },
  completeAll(){
    Todos.completeAll();
  },
  clearCompleted(){
    Todos.clearCompleted();
  },
  render() {
    var action = {
      deleteTodo:this.deleteTodo,
      editTodo:this.editTodo,
      completeTodo:this.completeTodo,
      completeAll:this.completeAll,
      clearCompleted:this.clearCompleted,
    };
    return (
      <div>
        <Header addTodo={this.addTodo} />
        <MainSection todos={this.state.todos} actions={action} />
      </div>
    );
  }
});

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
import Immutable from "immutable";
import './index.css';

let App = React.createClass({
  getInitialState(){
    return {
      todos:Immutable.fromJS([])
    };
  },
  addTodo(text){
    console.log(text);
    var todos = this.state.todos;
    let id = todos.reduce(
      (maxId,todo)=>Math.max(maxId,todo.get('id')),
      -1
    ) + 1;
    todos = todos.push(Immutable.fromJS({
      text:text,
      id:id,
      completed:false
    }));
    this.setState({todos:todos});
  },
  deleteTodo(id){
    var todos = this.state.todos;
    todos = todos.filter(
      (todo)=>todo.get('id') != id
    );
    this.setState({todos:todos});
  },
  editTodo(id,text){
    var todos = this.state.todos;
    todos = todos.map(
      (todo)=>todo.get('id')!=id?todo:todo.set('text',text)
    );
    this.setState({todos:todos});
  },
  completeTodo(id){
    var todos = this.state.todos;
    todos = todos.map(
      (todo)=>todo.get('id')!=id?todo:todo.update('completed',(completed)=>!completed)
    );
    this.setState({todos:todos});
  },
  completeAll(){
    var todos = this.state.todos;
    let areAllMarked = todos.every(
      (todo)=>todo.get('completed')
    );
    todos = todos.map(
      (todo)=>todo.set('completed',!areAllMarked)
    );
    this.setState({todos:todos});
  },
  clearCompleted(){
    var todos = this.state.todos;
    todos = todos.filter(
      (todo)=>!todo.get('completed')
    )
    this.setState({todos:todos});
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
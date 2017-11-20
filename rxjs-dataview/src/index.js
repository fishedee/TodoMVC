import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
import Immutable from "immutable";
import './index.css';
import Todos from './stores/todos'

let App = React.createClass({
  getInitialState(){
    return {
      todos:null,
    };
  },
  componentWillMount(){
  	Todos.subject.subscribe((todos)=>{
  		this.setState({todos:todos});
  	});
  },
  render() {
    var action = {
      deleteTodo:Todos.deleteTodo.bind(Todos),
      editTodo:Todos.editTodo.bind(Todos),
      completeTodo:Todos.completeTodo.bind(Todos),
      completeAll:Todos.completeAll.bind(Todos),
      clearCompleted:Todos.clearCompleted.bind(Todos),
      addTodo:Todos.addTodo.bind(Todos),
    };
    return (
      <div>
        <Header addTodo={action.addTodo} />
        <MainSection todos={this.state.todos} actions={action} />
      </div>
    );
  }
});

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);
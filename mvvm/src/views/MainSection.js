import React from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

let MainSection = React.createClass({
  getInitialState() {
    return { 
      filter: SHOW_ALL 
    };
  },

  handleClearCompleted() {
    const {todos} = this.props;
    var atLeastOneCompleted = false;
    for( var i in todos ){
      if( todos[i].completed ){
        atLeastOneCompleted = true;
        break;
      }
    }
    if (atLeastOneCompleted) {
      this.props.clearCompleted();
    }
  },

  handleShow(filter) {
    this.setState({ filter });
  },

  renderToggleAll(completedCount) {
    const { todos, completeAll } = this.props;
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={completeAll} />
      );
    }
  },

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted}
                onShow={this.handleShow} />
      );
    }
  },

  render() {
    const { todos, completeTodo} = this.props;
    const { filter } = this.state;

    let completedCount = 0;
    for(var i in todos ){
      var todo = todos[i];
      if(todo.completed){
        completedCount++;
      }
    };
    
    var todoItems = [];
    for(var index in todos ){
        var todo = todos[index];
        if( TODO_FILTERS[filter](todo) == false ){
          continue;
        }
        todoItems.push(
          <TodoItem key={todos[index].id} todos={todos} index={index} completeTodo={completeTodo.bind(null,index)}  />
        );
    }
    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {todoItems}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
});

export default MainSection;
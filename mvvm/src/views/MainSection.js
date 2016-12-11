import React from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.get('completed'),
  [SHOW_COMPLETED]: todo => todo.get('completed')
};

let MainSection = React.createClass({
  getInitialState() {
    return { 
      filter: SHOW_ALL 
    };
  },

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.get('completed'));
    if (atLeastOneCompleted) {
      this.props.clearCompleted();
    }
  },

  handleShow(filter) {
    this.setState({ filter });
  },

  renderToggleAll(completedCount) {
    const { todos, completeAll } = this.props;
    if (todos.size > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.size}
               onChange={completeAll} />
      );
    }
  },

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.size - completedCount;

    if (todos.size) {
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
    todos.forEach(function(todo){
      if(todo.get('completed')){
        completedCount++;
      }
    });
    
    var todoItems = [];
    todos.forEach(function(todo,index){
        if( TODO_FILTERS[filter](todo) == false ){
          return;
        }
        todoItems.push(
          <TodoItem key={todos.get(index).get('id')} todo={todos.link(index)} completeTodo={completeTodo.bind(null,index)}  />
        );
    })
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
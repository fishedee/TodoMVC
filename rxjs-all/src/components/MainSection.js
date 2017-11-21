import React from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import FilterTodos from '../stores/filtertodos';
import Filter from '../stores/filter';
import Todos from '../stores/todos';
import FilterAction from '../actions/filter';
import TodoAction from '../actions/todos';

let MainSection = React.createClass({
  getInitialState() {
    return { 
      filter: null,
      todos:null, 
    };
  },
  componentWillMount(){
    Filter.subscribe((filter)=>{
      this.setState({filter:filter});
    })
    FilterTodos.subscribe(todos=>{
      this.setState({todos:todos});
    })
  },
  handleClearCompleted() {
    TodoAction.clearCompleted.next();
  },

  handleShow(filter) {
    FilterAction.set.next(filter);
  },
  renderToggleAll(completedCount) {
    let todos = this.state.todos;
    if (todos.size > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.size}
               onChange={()=>TodoAction.completeAll.next()} />
      );
    }
  },

  renderFooter(completedCount) {
    const { todos } = this.state;
    const { filter } = this.state;
    const activeCount = todos.size - completedCount;
    return (
      <Footer completedCount={completedCount}
              activeCount={activeCount}
              filter={filter}
              onClearCompleted={this.handleClearCompleted}
              onShow={this.handleShow} />
    );
  },

  render() {
    const { todos } = this.state;
    const { filter } = this.state;
    const completedCount = todos.reduce((count, todo) =>
      todo.get('completed') ? count + 1 : count,
      0
    );
    
    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {todos.map(todo =>
            <TodoItem key={todo.get('id')} todo={todo} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
});

export default MainSection;
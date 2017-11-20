import React from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import FilterTodos from '../stores/filtertodos';
import Filter from '../stores/filter';
import Todos from '../stores/todos';

let MainSection = React.createClass({
  getInitialState() {
    return { 
      filter: null,
      todos:null, 
    };
  },
  componentWillMount(){
    Filter.getSubject().subscribe((filter)=>{
      this.setState({filter:filter});
    })
    FilterTodos.getSubject().subscribe(todos=>{
      this.setState({todos:todos});
    })
  },
  handleClearCompleted() {
    Todos.clearCompleted();
  },

  handleShow(filter) {
    Filter.set(filter);
  },
  renderToggleAll(completedCount) {
    let todos = this.state.todos;
    if (todos.size > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.size}
               onChange={Todos.completeAll.bind(Todos)} />
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
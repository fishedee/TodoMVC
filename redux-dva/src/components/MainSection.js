import React from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { connect } from 'react-redux';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};


let MainSection = React.createClass({
  handleClearCompleted() {
    this.props.dispatch({
      type:'todos/clearCompleted',
    })
  },

  handleShow(filter) {
    this.props.dispatch({
      type:'filter/mod',
      payload:{
        data:filter,
      }
    })
  },
  renderToggleAll(completedCount) {
    let todos = this.props.todos;
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={()=>this.props.dispatch({
                  type:'todos/completeAll',
               })} />
      );
    }
  },

  renderFooter(completedCount) {
    const { todos ,filter} = this.props;
    const activeCount = todos.length - completedCount;
    return (
      <Footer completedCount={completedCount}
              activeCount={activeCount}
              filter={filter}
              onClearCompleted={this.handleClearCompleted}
              onShow={this.handleShow} />
    );
  },

  render() {
    const { todos ,filter } = this.props;
    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    );

    
    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} dispatch={this.props.dispatch}/>
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
});

function mapStateToProps(state){
  return {
    todos:state.todos,
    filter:state.filter,
  }
}

export default connect(mapStateToProps)(MainSection);
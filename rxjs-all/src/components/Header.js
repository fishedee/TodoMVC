import React from 'react';
import TodoTextInput from './TodoTextInput';
import TodoAction from '../actions/todos';

let Header = React.createClass({
  handleSave(text) {
    if (text.length !== 0) {
      TodoAction.addTodo.next(text);
    }
  },
  render() {
    return (
      <header className="header">
          <h1>todos</h1>
          <TodoTextInput newTodo
                         onSave={this.handleSave}
                         placeholder="What needs to be done?" />
      </header>
    );
  }
});

export default Header;
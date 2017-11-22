import React from 'react';
import TodoTextInput from './TodoTextInput';
import Context from '../context';

let Header = React.createClass({
  handleSave(text) {
    if (text.length !== 0) {
      Context.todoAction.addTodo.next(text);
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
import React from 'react';
import TodoTextInput from './TodoTextInput';
import Immutable from 'immutable';

let countId = 10001;

let Header = React.createClass({
  handleSave(text) {
    if (text.length !== 0) {
      var todos = this.props.todos;
      todos.push({
        completed:false,
        text:text,
        id:countId++
      });
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
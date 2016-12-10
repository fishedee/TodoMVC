import React from 'react';
import TodoTextInput from './TodoTextInput';

let countId = 10001;

let Header = React.createClass({
  handleSave(text) {
    if (text.length !== 0) {
      this.props.onDataChange('insert',[],{
        completed:false,
        text:text,
        id:countId++,
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
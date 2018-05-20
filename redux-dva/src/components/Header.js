import React from 'react';
import TodoTextInput from './TodoTextInput';
import { connect } from 'react-redux';

let Header = React.createClass({
  handleSave(text) {
    if (text.length !== 0) {
      this.props.dispatch({
        type:'todos/add',
        payload:{
          text:text,
          completed:false,
        }
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

export default connect()(Header);
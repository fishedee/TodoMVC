import React from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

let TodoItem = React.createClass({
  getInitialState() {
    return {
      editing: false
    };
  },

  handleDoubleClick() {
    this.setState({ editing: true });
  },

  handleSave(text) {
    if (text.length === 0) {
      var todos = this.props.todos;
      var todoIndex = this.props.index;
      todos.splice(todoIndex,1);
    } else {
      this.props.todos[this.props.index].text = text;
    }
    this.setState({ editing: false });
  },

  render() {
    
    const {completeTodo,todos,index} = this.props;
    var todo = todos[index];
    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(text)} />
      );
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => completeTodo()} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={()=>this.handleSave('')} />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
});

export default TodoItem;
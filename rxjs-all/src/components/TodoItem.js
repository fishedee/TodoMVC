import React from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import TodoAction from '../actions/todos';

let TodoItem = React.createClass({
  getInitialState() {
    return {
      editing: false
    };
  },

  handleDoubleClick() {
    this.setState({ editing: true });
  },

  handleSave(id, text) {
    if (text.length === 0) {
      TodoAction.deleteTodo.next(id);
    } else {
      TodoAction.editTodo.next([id, text]);
    }
    this.setState({ editing: false });
  },

  render() {
    
    const {todo, completeTodo, deleteTodo} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.get('text')}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.get('id'), text)} />
      );
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.get('completed')}
                 onChange={() => TodoAction.completeTodo.next(todo.get('id'))} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.get('text')}
          </label>
          <button className="destroy"
                  onClick={()=>TodoAction.deleteTodo.next(todo.get('id'))} />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.get('completed'),
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
});

export default TodoItem;
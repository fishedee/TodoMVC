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
      var todos = this.props.todo.parent();
      var todoIndex = this.props.todo.index()
      var newTodos = todos.splice(todoIndex,1);
      todos.change(newTodos);
    } else {
      this.props.todo.link('text').change(text);
    }
    this.setState({ editing: false });
  },

  render() {
    
    const {completeTodo,todo} = this.props;
    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.get('text')}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(text)} />
      );
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.get('completed')}
                 onChange={() => completeTodo()} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.get('text')}
          </label>
          <button className="destroy"
                  onClick={()=>this.handleSave('')} />
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
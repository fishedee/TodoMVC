import React from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import { editTodoAction , completeTodoAction } from '../actions/todos';

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
      this.props.dispatch({
        type:'DEL_TODO',
        payload:{
          id:id,
        }
      });
    } else {
      this.props.dispatch(editTodoAction({
          id:id,
          text:text,
        }
      ));
    }
    this.setState({ editing: false });
  },

  render() {
    
    const {todo, dispatch} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      );
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => dispatch(completeTodoAction({
                      id:todo.id,
                    }
                 ))} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={()=>dispatch({
                    type:'DEL_TODO',
                    payload:{
                      id:todo.id,
                    }
                  })} />
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
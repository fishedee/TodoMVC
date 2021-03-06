import React from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

class TodoItem extends React.PureComponent{
  state = {
    editing:false
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.dispatch({
        type:'todos/del',
        payload:{
          id:id,
        }
      });
    } else {
      this.props.dispatch({
        type:'todos/edit',
        payload:{
          id:id,
          text:text,
        }
      });
    }
    this.setState({ editing: false });
  }

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
                 onChange={() => dispatch({
                    type:'todos/complete',
                    payload:{
                      id:todo.id,
                    }
                 })} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={()=>dispatch({
                    type:'todos/del',
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
};

export default TodoItem;
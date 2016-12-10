import React from 'react';
import Header from './Header';
import MainSection from './MainSection';

let App = React.createClass({
  render() {
    return (
      <div>
        <div>操作次数:{this.props.count}</div>
        <Header addTodo={this.props.addTodo} />
        <MainSection 
          todos={this.props.todos} 
          clearCompleted={this.props.clearCompleted} 
          completeAll={this.props.completeAll}
          completeTodo={this.props.completeTodo}
          deleteTodo={this.props.deleteTodo}
          editTodo={this.props.editTodo}
          />
      </div>
    );
  }
});

export default App;
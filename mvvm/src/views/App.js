import React from 'react';
import Header from './Header';
import MainSection from './MainSection';

let App = React.createClass({
  render() {
    return (
      <div>
        <div>操作次数:{this.props.data.count }</div>
        <Header todos={this.props.data.todos} />
        <MainSection 
          todos={this.props.data.todos}
          clearCompleted={this.props.clearCompleted} 
          completeAll={this.props.completeAll}
          completeTodo={this.props.completeTodo}
          />
      </div>
    );
  }
});

export default App;
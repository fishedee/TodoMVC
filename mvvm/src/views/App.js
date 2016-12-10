import React from 'react';
import Header from './Header';
import MainSection from './MainSection';

let App = React.createClass({
  onDataChange(prefix,operation,key,value){
    key = [prefix,...key];
    this.props.onDataChange(operation,key,value);
  },
  render() {
    return (
      <div>
        <div>操作次数:{this.props.data.get('count')}</div>
        <Header onDataChange={this.onDataChange.bind(this,'todos')} />
        <MainSection 
          todos={this.props.data.get('todos')} 
          onDataChange={this.onDataChange.bind(this,'todos')}
          clearCompleted={this.props.clearCompleted} 
          completeAll={this.props.completeAll}
          completeTodo={this.props.completeTodo}
          />
      </div>
    );
  }
});

export default App;
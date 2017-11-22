import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
import './index.css';

let App = React.createClass({
  render() {
    return (
      <div>
        <Header/>
        <MainSection/>
      </div>
    );
  }
});

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);
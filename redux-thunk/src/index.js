import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore ,applyMiddleware } from 'redux';
import reducers from './reducers';
import './index.css';

let store = createStore(reducers,applyMiddleware(thunk));

let App = React.createClass({
  render() {
    return (
      <Provider store={store}>
      	<div>
	        <Header/>
	        <MainSection/>
        </div>
      </Provider>
    );
  }
});

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);
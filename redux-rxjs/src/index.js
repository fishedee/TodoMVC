import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { createStore ,applyMiddleware } from 'redux';
import reducers from './reducers';
import epics from './epics';
import './index.css';

let epicMiddleware = createEpicMiddleware(epics);

let store = createStore(reducers,applyMiddleware(epicMiddleware));

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
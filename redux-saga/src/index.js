import 'babel-polyfill';
import 'babel-core/register';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { createStore ,applyMiddleware } from 'redux';
import reducers from './reducers';
import sagas from './sagas';
import './index.css';

let sagaMiddleware = createSagaMiddleware({});

let store = createStore(reducers,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

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
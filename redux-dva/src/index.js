import 'babel-polyfill';
import 'babel-core/register';
import React from 'react';
import ReactDOM from 'react-dom';
import dva, { connect } from 'dva';
import Header from './components/Header';
import MainSection from './components/MainSection';
import todos from './models/todos';
import filter from './models/filter';
import './index.css';

const app = dva();

app.model(todos);
app.model(filter);

app.router(() =>(<div>
	        <Header/>
	        <MainSection/>
        </div>));

app.start('#app');
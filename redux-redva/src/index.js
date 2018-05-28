import 'babel-polyfill';
import React from 'react';
import redva from 'redva';
import Header from './components/Header';
import MainSection from './components/MainSection';
import todos from './models/todos';
import filter from './models/filter';
import './index.css';

const app = redva();

app.model(todos);
app.model(filter);

app.router(() =>(<div>
	        <Header/>
	        <MainSection/>
        </div>));

app.start('#root');
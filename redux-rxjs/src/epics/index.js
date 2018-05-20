import { combineEpics } from 'redux-observable';
import todosEpic from './todos';

export default combineEpics(
  todosEpic
);
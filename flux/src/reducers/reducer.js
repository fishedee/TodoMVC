import todos from './todos';
import log from './log';

let initialState = {};
export default function(state = initialState, action){
	return {
		todos:todos(state.todos,action),
		log:todos(state.log,action)
	};
}
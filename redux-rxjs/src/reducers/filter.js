import {SHOW_ALL} from '../constants/TodoFilters';

const initialState = SHOW_ALL;

export default function todos( state = initialState,action ){
	switch( action.type ){
		case 'MOD_FILTER':
			return action.payload.data;
		default: 
			return state;
	}
}
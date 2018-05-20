import {SHOW_ALL} from '../constants/TodoFilters';

export default {
	namespace:'filter',
	state:SHOW_ALL,
	reducers:{
		mod(state,action){
			return action.payload.data;
		}
	}
}
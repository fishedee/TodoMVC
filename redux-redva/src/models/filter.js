import {SHOW_ALL} from '../constants/TodoFilters';

export default {
	namespace:'filter',
	state:SHOW_ALL,
	mutations:{
		mod(state,action){
			state.filter = action.payload.data;
		}
	}
}
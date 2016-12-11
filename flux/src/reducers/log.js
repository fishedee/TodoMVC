let initialState = 0;

export default function(state = initialState, action){
	switch(action.type){
		case 'addLog':
			return state+1;
		default:
			return state;
	}
}
const initialState = [];

export default function todos( state = initialState,action ){
	switch( action.type ){
		case 'ADD_TODO':
			return [
		        ...state,
		        {
		          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
		          completed: false,
		          text: action.payload.text
		        }
		      ];
		case 'DEL_TODO':
			return state.filter(todo=>todo.id != action.payload.id);
		case 'MOD_TODO':
			return state.map(todo=>{
				if( todo.id != action.payload.id ){
					return todo;
				}else{
					return {
						...todo,
						[action.payload.key]:action.payload.value,
					}
				}
			});
		case 'MOD_ALL_TODO':
			return state.map(todo=>{
				return {
					...todo,
					[action.payload.key]:action.payload.value,
				}
			})
		default: 
			return state;
	}
}
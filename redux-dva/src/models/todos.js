export default {
	namespace:'todos',
	state: [],
	effects: {
		* edit({payload},{put}){
			yield put({
				type:"mod",
				payload:{
					id:payload.id,
					key:'text',
					value:payload.text,
				}
			})
		},
		* complete({payload},{select,put}){
			let todos =  yield select((state)=>(state.todos));
			let filterTodos = todos.filter((todo)=>(todo.id == payload.id));
			if( filterTodos.length != 0 ){
				yield put({
					type:"mod",
					payload:{
						id:payload.id,
						key:'completed',
						value:!filterTodos[0].completed
					}
				})
			}
		},
		* completeAll({payload},{select,put}){
			let todos = yield select((state)=>(state.todos));
			let areAllMarked = todos.every((todo)=>todo.completed);
			yield put({
				type:"modAll",
				payload:{
					key:'completed',
					value:!areAllMarked,
				}
			});
		},
		* clearCompleted({payload},{select,put}){
			let todos = yield select((state)=>(state.todos));
			let completeTodo = todos.filter((todo)=>todo.completed);
			for( let i = 0 ;i != completeTodo.length ;i ++){
				yield put({
					type:"del",
					payload:{
						id:completeTodo[i].id,
					}
				})
			}
		}
	},
	reducers:{
		add(state,action){
			return [
		        ...state,
		        {
		          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
		          completed: false,
		          text: action.payload.text
		        }
		      ];
		},
		del(state,action){
			return state.filter(todo=>todo.id != action.payload.id);
		},
		mod(state,action){
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
		},
		modAll(state,action){
			return state.map(todo=>{
				return {
					...todo,
					[action.payload.key]:action.payload.value,
				}
			});
		}
	}
}
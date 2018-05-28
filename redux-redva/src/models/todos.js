const findTodo = (todos,id)=>{
	return todos.findIndex((todo)=>{
		return todo.id == id;
	})
}
export default {
	namespace:'todos',
	state: [],
	actions: {
		edit({payload},{dispatch}){
			dispatch({
				type:"mod",
				payload:{
					id:payload.id,
					key:'text',
					value:payload.text,
				}
			})
		},
		complete({payload},{dispatch,getState}){
			let todos =  getState().todos;
			let filterTodos = todos.filter((todo)=>(todo.id == payload.id));
			if( filterTodos.length != 0 ){
				dispatch({
					type:"mod",
					payload:{
						id:payload.id,
						key:'completed',
						value:!filterTodos[0].completed
					}
				})
			}
		},
		completeAll({payload},{dispatch,getState}){
			let todos = getState().todos;
			let areAllMarked = todos.every((todo)=>todo.completed);
			dispatch({
				type:"modAll",
				payload:{
					key:'completed',
					value:!areAllMarked,
				}
			});
		},
		clearCompleted({payload},{dispatch,getState}){
			let todos = getState().todos;
			let completeTodo = todos.filter((todo)=>todo.completed);
			for( let i = 0 ;i != completeTodo.length ;i ++){
				dispatch({
					type:"del",
					payload:{
						id:completeTodo[i].id,
					}
				})
			}
		}
	},
	mutations:{
		add(state,action){
			let maxId = state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
			state.todos.push({
				id:maxId+1,
				completed: false,
		        text: action.payload.text
			});
		},
		del(state,action){
			let index = findTodo(state.todos,action.payload.id);
			if( index != -1 ){
				state.todos.splice(index,1);
			}
		},
		mod(state,action){
			let index = findTodo(state.todos,action.payload.id);
			if( index != -1 ){
				state.todos[index][action.payload.key] = action.payload.value;
			}
		},
		modAll(state,action){
			state.todos = state.todos.map(todo=>{
				todo[action.payload.key] = action.payload.value;
				return todo;
			});
		}
	}
}
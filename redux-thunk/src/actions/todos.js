
export function editTodoAction(payload){
	return (dispatch,getState)=>{
		dispatch({
			type:"MOD_TODO",
			payload:{
				id:payload.id,
				key:'text',
				value:payload.text,
			}
		})
	}
}

export function completeTodoAction(payload){
	return (dispatch,getState)=>{
		let todos =  getState().todos;
		let filterTodos = todos.filter((todo)=>(todo.id == payload.id));
		if( filterTodos.length != 0 ){
			dispatch({
				type:"MOD_TODO",
				payload:{
					id:payload.id,
					key:'completed',
					value:!filterTodos[0].completed
				}
			})
		}
	}
}

export function completeAllAction(payload){
	return (dispatch,getState)=>{
		let todos =  getState().todos;
		let areAllMarked = todos.every((todo)=>todo.completed);
		dispatch({
			type:"MOD_ALL_TODO",
			payload:{
				key:'completed',
				value:!areAllMarked,
			}
		});
	}
}

export function clearCompletedAction(payload){
	return (dispatch,getState)=>{
		let todos =  getState().todos;
		let completeTodo = todos.filter((todo)=>todo.completed);
		for( let i = 0 ;i != completeTodo.length ;i ++){
			dispatch({
				type:"DEL_TODO",
				payload:{
					id:completeTodo[i].id,
				}
			})
		}
		
	}
}
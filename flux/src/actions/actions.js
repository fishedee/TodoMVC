export const addTodo = text => ({ type: 'addTodo', text })
export const deleteTodo = id => ({ type: 'delTodo', id })
export const editTodo = (id, text) => ({ type: 'editTodo', id, text })
export const completeTodo = id => ({ type: 'completeTodo', id })
export const completeAll = () => ({ type: 'completeAll' })
export const clearCompleted = () => (function(dispatch){
	dispatch({type:'addLog'})
	dispatch({type:'clearComplete'})
})
import { put, takeEvery, delay , take,all,fork ,select} from 'redux-saga/effects'

function* editTodo(payload){
	yield put({
		type:"MOD_TODO",
		payload:{
			id:payload.id,
			key:'text',
			value:payload.text,
		}
	})
}

function* watchEditTodo(){
	while(true) {
		const {payload} = yield take('EDIT_TODO');
		yield fork(editTodo,payload)
	}
}

function* completeTodo(payload){
	console.log('mm');
	let todos =  yield select((state)=>(state.todos));
	let filterTodos = todos.filter((todo)=>(todo.id == payload.id));
	if( filterTodos.length != 0 ){
		yield put({
			type:"MOD_TODO",
			payload:{
				id:payload.id,
				key:'completed',
				value:!filterTodos[0].completed
			}
		})
	}
}

function* watchCompleteTodo(){
	while(true) {
		const {payload} = yield take('COMPLETE_TODO');
		yield fork(completeTodo,payload)
	}
}

function *completeAll(payload){
	let todos = yield select((state)=>(state.todos));
	let areAllMarked = todos.every((todo)=>todo.completed);
	yield put({
		type:"MOD_ALL_TODO",
		payload:{
			key:'completed',
			value:!areAllMarked,
		}
	});
}

function* watchCompleteAll(){
	while(true) {
		const {payload} = yield take('COMPLETE_ALL_TODO');
		yield fork(completeAll,payload)
	}
}

function *clearCompleted(payload){
	let todos = yield select((state)=>(state.todos));
	let completeTodo = todos.filter((todo)=>todo.completed);
	for( let i = 0 ;i != completeTodo.length ;i ++){
		yield put({
			type:"DEL_TODO",
			payload:{
				id:completeTodo[i].id,
			}
		})
	}
}

function *watchClearCompleted(payload){
	while(true) {
		const {payload} = yield take('CLEAR_COMPLETE_TODO');
		yield fork(clearCompleted,payload)
	}
}

export default function* root() {
  yield all([
    fork(watchEditTodo),
    fork(watchCompleteTodo),
    fork(watchCompleteAll),
    fork(watchClearCompleted),
  ])
}
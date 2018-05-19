import { combineEpics } from 'redux-observable';
import Rx from 'rxjs/Rx'

let editTodoAction$ = (action$,store)=>action$.ofType("EDIT_TODO")
	.map((action)=>{return{
		type:'MOD_TODO',
		payload:{
			id:action.payload.id,
			key:'text',
			value:action.payload.text,
		}
	}})

let completeTodoAction$ = (action$,store)=>action$.ofType('COMPLETE_TODO')
	.map((action)=>{
		return store.getState().todos.filter((todo)=>todo.id == action.payload.id)
	})
	.filter((todos)=>{
		return todos.length != 0;
	})
	.map((todo)=>{return{
		type:"MOD_TODO",
		payload:{
			id:todo[0].id,
			key:'completed',
			value:!todo[0].completed,
		}
	}})

let completeAllAction$ = (action$,store)=>action$.ofType('COMPLETE_ALL_TODO')
	.map((action)=>{
		let areAllMarked = store.getState().todos.every((todo)=>todo.completed);
		return {
			type:"MOD_ALL_TODO",
			payload:{
				key:'completed',
				value:!areAllMarked,
			}
		}
	});

let clearCompletedAction$ = (action$,store)=>action$.ofType('CLEAR_COMPLETE_TODO')
	.map((action)=>{
		return store.getState().todos.filter((todo)=>todo.completed);
	})
	.mergeMap((todos)=>{
		return Rx.Observable.from(todos.map((todo)=>{
			return {
				type:"DEL_TODO",
				payload:{
					id:todo.id,
				}
			};	
		}));
	});

export default combineEpics(
  editTodoAction$,
  completeTodoAction$,
  completeAllAction$,
  clearCompletedAction$,
);
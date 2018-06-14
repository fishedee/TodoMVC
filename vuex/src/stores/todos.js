class Todo{
	constructor(id,text,store){
		this.text = text
		this.id = id
		this.completed = false
		this.store = store
	}
	remove(){
		const index = this.store.indexOf(this);
		if( index != -1 ){
			this.store.splice(index,1);
		}
	}
	toggle(){
		this.completed = !this.completed
	}
	setText(text){
		this.text = text
	}
	setCompleted(completed){
		this.completed = completed
	}
}
export default {
	namespaced: true,
	
	state:{
		todos:[]
	},
	mutations:{
		addTodo(state,text){
			let maxId = 0;
			for( const i in state.todos ){
				if( state.todos[i].id > maxId){
					maxId = state.todos[i].id;
				}
			}
			state.todos.push(new Todo(maxId+1,text,state.todos))
		},
		toggleAll(state){
			let isToggleAll = true;
			for( const i in state.todos ){
				if( state.todos[i].completed == false ){
					isToggleAll = false;
					break;
				}
			}
			for( const i in state.todos ){
				state.todos[i].setCompleted(!isToggleAll);
			}
		},
		clearCompleted(state){
			let newTodos = [];
			for( const i in state.todos){
				if( state.todos[i].completed == false ){
					newTodos.push(state.todos[i]);
				}
			}
			state.todos = newTodos;
		},
	},
	getters: {
		completedCount (state) {
			let count = 0;
			for( const i in state.todos ){
				if( state.todos[i].completed == true ){
					count++;
				}
			}
			return count;
	    },
	}
}
let initialState = [];

export default function(state = initialState, action){
	switch(action.type){
		case 'addTodo':
	      return [
	        {
	          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
	          completed: false,
	          text: action.text
	        },
	        ...state
	      ]

	    case 'delTodo':
	      return state.filter(todo =>
	        todo.id !== action.id
	      )

	    case 'editTodo':
	      return state.map(todo =>
	        todo.id === action.id ?
	          { ...todo, text: action.text } :
	          todo
	      )

	    case 'completeTodo':
	      return state.map(todo =>
	        todo.id === action.id ?
	          { ...todo, completed: !todo.completed } :
	          todo
	      )

	    case 'completeAll':
	      const areAllMarked = state.every(todo => todo.completed)
	      return state.map(todo => ({
	        ...todo,
	        completed: !areAllMarked
	      }))

	    case 'clearComplete':
	      return state.filter(todo => todo.completed === false)

	    default:
	      return state
	}
}
import FilterAction from "../actions/filter";
import TodoAction from "../actions/todos";
import FilterStore from "../stores/filter";
import TodoStore from "../stores/todos";
import FilterTodoStore from "../stores/filtertodos";
import Rx from 'rxjs/Rx';

var actions = new Rx.Subject();

var todoStore =  TodoStore(actions);
var filterStore =  FilterStore(actions);
var filterTodoStore =  FilterTodoStore(todoStore,filterStore);

var todoAction = TodoAction(todoStore)
var filterAction = FilterAction()

todoAction.actions.subscribe(actions)
filterAction.actions.subscribe(actions)

export default {
	todoStore,
	filterStore,
	filterTodoStore,
	todoAction,
	filterAction,
}
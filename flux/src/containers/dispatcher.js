import reducer from '../reducers/reducer';
import store from './store';

export default function dispatch(action){
	if( typeof action == 'object' ){
		var oldStore = store.get();
		var newStore = reducer(oldStore,action)
		store.set(newStore);
	}else{
		action(dispatch);
	}
}
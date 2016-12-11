import reducer from '../reducers/reducer';

var store = reducer(undefined,{});
var listeners = [];

function addListener(listener){
	listeners.push(listener);
}

function fireListener(){
	for( var i in listeners ){
		listeners[i]();
	}
}

function set(inStore){
	store = inStore;
	fireListener();
}

function get(){
	return store;
}

export default {
	addListener:addListener,
	fireListener:fireListener,
	set:set,
	get:get,
};
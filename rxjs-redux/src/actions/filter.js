import Rx from 'rxjs/Rx';

function Action(){
	var set = new Rx.Subject();

	var setAction = set.map((data)=>{
		return {
			type:"MOD_FILTER",
			payload:{
				data:data,
			}
		}
	})

	var actions = Rx.Observable
		.merge(setAction);
	return {
		set,
		actions,
	}
}

export default Action;
import Immutable from "immutable";
import Rx from 'rxjs/Rx';

function Store(){
	var result = new Rx.BehaviorSubject(Immutable.fromJS([]));
	return result;
}

export default Store();
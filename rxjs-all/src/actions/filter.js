import Rx from 'rxjs/Rx';
import Filter from '../stores/filter';

function Action(Filter){
	var set = new Rx.Subject();

	set.withLatestFrom(Filter,function(text,filter){
		return text
	}).subscribe(Filter);
	return {
		set:set,
	}
}

export default Action(Filter)
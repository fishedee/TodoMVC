var Rx = require('rxjs/Rx');


Rx.Observable.from([1,2,3])
	.scan(function(score,current){
		return score+current
	},0)
	.subscribe(function(data){
		console.log(data);
	})
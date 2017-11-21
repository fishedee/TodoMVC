var Rx = require('rxjs/Rx');

var breakWhen$ = Rx.Observable.timer(1000);

var stream$ = Rx.Observable.interval(200)
.buffer( breakWhen$ );

stream$.subscribe((data) => console.log( 'values',data ));
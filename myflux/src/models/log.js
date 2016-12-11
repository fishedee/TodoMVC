let Log = {
	init(){
		this.state = 0;
		this.listener = [];
	},
	addListener(listener){
		this.listener.push(listener);
	},
	fireListener(){
		for( var i in this.listener ){
			var single = this.listener[i];
			single();
		}
	},
	addCount(){
		this.state++;
		this.fireListener();
	},
	get(){
		return this.state;
	}
}

Log.init();

export default Log;
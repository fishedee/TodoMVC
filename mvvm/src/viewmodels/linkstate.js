function LinkProperty(data,change,result){
	for( var i in data ){
		var value = data[i];
		value = LinkData(value,change);
		(function(value){
			Object.defineProperty(result,i,{
				set:function(inValue){
					value = LinkData(inValue,change);
					change();
				},
				get:function(){
					return value;
				}
			});
		})(value);
	}
}

function LinkFunction(data,result){
	for( var i in data ){
		Object.defineProperty(result,i,{
			enumerable: false,
			configurable: false,
			writable: false,
			value: data[i]
		});
	}
}

function LinkArray(data,change){
	var result = [];
	LinkProperty(data,change,result);
	LinkFunction({
		change:change
	},result);
	const arrayProto = Array.prototype;
	var arrayFun = [
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	];
	for( var i in arrayFun ){
		const methodName = arrayFun[i];
		const original = arrayProto[methodName];
		const methodGo = function() {
			let i = arguments.length;
			const args = new Array(i)
			while (i--) {
			  args[i] = arguments[i]
			}
			var inserted = args.length;
			switch (methodName) {
			  case 'push':
			    inserted = 0;
			    break
			  case 'unshift':
			    inserted = 0;
			    break
			  case 'splice':
			    inserted = 2;
			    break
			}
			for( var j = inserted ; j < args.length ; ++j ){
				args[j] = LinkData(args[j],change);
			}
			change();
			return original.apply(this, args);
		};
		var linkFun = {};
		linkFun[methodName] = methodGo;
		LinkFunction(linkFun,result);
	} 
	return result;
}

function LinkObject(data,change){
	var result = {};
	LinkProperty(data,change,result);
	LinkFunction({
		change:change
	},result);
	return result;
}

function LinkData(data,change){
	if( data == null ||
		typeof data == 'undefined' ){
		return data;
	}
	if( typeof data == 'number' ||
		typeof data == 'string' ||
		typeof data == 'boolean' ){
		return data;
	}else if( data instanceof Array ){
		return LinkArray(data,change)
	}else{
		return LinkObject(data,change);
	}
}

function LinkState(component,key,state){
	var change = function(){
		component.setState({});
	}
	state = LinkData(state,change);
	var result = {};
	result[key] = state;
	return result;
}


export default LinkState;
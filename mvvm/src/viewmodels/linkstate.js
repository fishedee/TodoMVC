function LinkData(data,key,parent){
	var bindData;
	if( typeof data == 'number' ||
		typeof data == 'string' ||
		typeof data == 'boolean'){
		bindData = {
			value:data,
			get:function(){
				return null;
			}
		}
	}else{
		bindData = data;
	}
	bindData.parent = function(){
		return parent;
	}
	bindData.index = function(){
		return key;
	}
	bindData.link = function(index){
		var newValue = bindData.get(index);
		return LinkData(newValue,index,bindData);
	}
	bindData.change = function(value){
		var newValue = parent.set(key,value);
		parent.change(newValue);
	}
	return bindData;
}

function LinkTopData(component,key,value){
	var bindData = value;
	bindData.parent = function(){
		return null;
	}
	bindData.index = function(){
		return -1;
	}
	bindData.link = function(index){
		var newValue = bindData.get(index);
		return LinkData(newValue,index,bindData);
	}
	bindData.change = function(value){
		component.state[key] = LinkTopData(component,key,value);
		component.setState({});
	}
	return bindData;
}

function LinkState(component,key,value){
	var bindData = LinkTopData(component,key,value);
	var result = {};
	result[key] = bindData;
	return result;
}


export default LinkState;
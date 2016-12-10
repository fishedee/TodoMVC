import Immutable from 'immutable';
let BindData = {
	getInitialState(){
		return {
			data:Immutable.fromJS({
				count:0,
				todos:[],
			}),
		}
	},
	onDataChange(operation,key,value){
		console.log(operation+","+key+","+value);
		value = Immutable.fromJS(value);
		var data = this.state.data;
		if( operation == 'update'){
			data = data.updateIn(key,function(){
				return value;
			});
		}else if( operation == 'insert'){
			data = data.updateIn(key,function(single){
				return single.push(value);
			});
		}else{
			data = data.deleteIn(key);
		}
		this.setState({data:data});
	}
};

export default BindData;
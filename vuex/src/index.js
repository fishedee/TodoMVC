import 'babel-polyfill'
import './index.css'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/app'
import Todos from './stores/todos'
import './index.css'

Vue.use(Vuex);
new Vue({
	el: '#root',
	store:new Vuex.Store(Todos),
	render:(createElement)=>createElement(App)
})
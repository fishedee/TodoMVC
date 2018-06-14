import 'babel-polyfill'
import './index.css'
import Vue from 'vue'
import App from './components/app'
import './index.css'

new Vue({
	el: '#root',
	render:(createElement)=>createElement(App)
})
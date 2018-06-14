<template>
	<div>
		<header class="header">
			<h1>todos</h1>
			<input class="new-todo" v-model="editingText" type="text" @keydown.enter="addTodo" placeholder="What needs to be done?" />
		</header>
		<section class="main">
			<input v-if="todos.length>0" class="toggle-all" type="checkbox" v-bind:checked="completedCount == todos.length" v-on:change="toggleAll"/>
			<ul class="todo-list">
				<TodoItem v-for="todo in visualTodos" v-bind:todo="todo" v-bind:key="todo.id"/>
			</ul>
			<footer class="footer">
				<span class="todo-count">
					<strong>{{ (todos.length-completedCount) || 'NO'}}</strong> {{(todos.length-completedCount)==1?'item':'items'}} left
				</span>
				<ul class="filters">
					<li v-for="filter in filters" v-bind:key="filter">
						<a v-bind:class="{ selected: filter == currentFiler }"
							v-bind:style="{cursor:'pointer'}"
							v-on:click="setFilter(filter)">
							{{filter}}
						</a>
					</li>
				</ul>
				<button v-if="completedCount > 0" class="clear-completed" v-on:click="clearCompleted">
					Clear completed
				</button>
			</footer>
		</section>
	</div>
</template>

<script>
import TodoItem from './todoitem';

export default {
	data(){
		return {
			editingText:'',
			filters:['All','Active','Completed'],
			currentFiler:'All',
		}
	},
	computed:{
		todos(){
			return this.$store.state.todos
		},
		completedCount () {
			return this.$store.getters.completedCount;
	    },
	    visualTodos(){
	    	let filterFunc = {
	    		All:()=>true,
	    		Active:todo=>!todo.completed,
	    		Completed:todo=>todo.completed,
	    	}
	    	let newTodos = [];
	    	for( const i in this.todos ){
	    		if( filterFunc[this.currentFiler](this.todos[i]) ){
	    			newTodos.push(this.todos[i]);
	    		}
	    	}
	    	return newTodos;
	    }
	},
	methods:{
		addTodo(){
			this.$store.commit('addTodo',this.editingText)
			this.editingText = ''
		},
		toggleAll(){
			this.$store.commit('toggleAll');
		},
		clearCompleted(){
			this.$store.commit('clearCompleted');
		},
		setFilter(filter){
			this.currentFiler = filter;
		}

	},
	components:{
		TodoItem
	}
}
</script>

<style>
</style>
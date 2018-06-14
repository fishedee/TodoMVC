<template>
	<li v-bind:class="{editing:editing}">
		<input v-if="editing" class="edit" v-model="editingText" type="text" @blur="onSubmit" @keydown.enter="onSubmit"/>
		<div v-else class="view">
			<input class="toggle" type="checkbox" v-bind:checked="todo.completed" v-on:change="onChange"/>
			<label @dblclick="onDoubleClick">{{ todo.text }}</label>
			<button class="destroy" v-on:click="onClick"/>
		</div>
	</li>
</template>

<script>
export default {
	props:['todo'],
	data(){
		return {
			editing:false,
			editingText:'',
		}
	},
	methods:{
		onChange(){
			this.todo.completed = !this.todo.completed
		},
		onDoubleClick(){
			this.editing = true
			this.editingText = this.text
		},
		onClick(){
			this.$emit('remove')
		},
		onSubmit(){
			this.todo.text = this.editingText
			this.editing = false
		}
	}
}
</script>

<style>
</style>
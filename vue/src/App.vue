<script setup lang="ts">
import '../../style.css'
import { ref, watch, onMounted } from 'vue'

type Todo = {
  value: string,
  completed: boolean
}
const todos = ref<Todo[]>([])
const completedCount = ref(0)
const input = ref("")

const readLocalStorage = (key: string, fallback: any) => {
  if (localStorage.getItem(key)) return JSON.parse(localStorage[key])
  else return fallback
}

const writeLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

onMounted(() => {
  todos.value = readLocalStorage('todoodle--todos', [])
  completedCount.value = readLocalStorage('todoodle--completedCount', 0)
})

watch(todos, () => writeLocalStorage('todoodle--todos', todos.value))
watch(completedCount, () => writeLocalStorage('todoodle--completedCount', completedCount.value))

const addTodo = () => {
  if (input.value === "") return
  todos.value = [...todos.value, { value: input.value,completed: false }]
  input.value = ""
}

const removeTodo = (index: number) => {
  if (todos.value[index].completed) {
    completedCount.value++
  }
  todos.value = todos.value.filter((_, i) => i !== index)
}

const toggleTodo = (index: number) => {
  const shallowState = todos.value
  shallowState[index].completed = !shallowState[index].completed
  todos.value = shallowState
}

const resetCount = () => {
  completedCount.value = 0
}
</script>

<template>

<div id="app">

  <h1 class="header">Vue</h1>

  <div class="completed-wrapper">
    <h3 class="completed-count">
      {{ completedCount }} completed tasks
    </h3>
    <button class="completed-reset" @click="resetCount">Reset</button>
  </div>

  <div class="input-wrapper">
    <input
      class="input-input"
      type="text"
      placeholder="Create a new to-do"
      v-model="input"
      @keydown.enter="addTodo"
    />
    <button class="input-button" @click="addTodo">Add</button>
  </div>

  <div class="todos-wrapper">
    <div 
      v-for="(task, index) in todos"
      :key="index"
      class="todos-container"
      :class="{'completed': task.completed}"
      @click="toggleTodo(index)"
    >
      <span class="todos-todo">{{ task.value }}</span>
      <button class="todos-delete" @click.stop="removeTodo(index)"/>
    </div>
  </div>

</div>

</template>

<style scoped>
h1 {
  color: #81c784;
  text-shadow: 1px 1px #4caf50, 2px 2px #388e3c, 3px 3px #1b5e20;
}
</style>

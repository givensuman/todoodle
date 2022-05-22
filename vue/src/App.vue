<script setup lang="ts">
import '../../style.css'
import { ref, onMounted } from 'vue'

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

const addTodo = () => {
  if (input.value === "") return
  todos.value = [...todos.value, {
    value: input.value,
    completed: false
  }]
  writeLocalStorage('todoodle--todos', todos.value)
  input.value = ""
}

const removeTodo = (index: number) => {
  if (todos.value[index].completed) {
    completedCount.value++
    writeLocalStorage('todoodle--completedCount', completedCount.value)
  }
  todos.value = todos.value.filter((_, i) => i !== index)
  writeLocalStorage('todoodle--todos', todos.value)
}

const toggleTodo = (index: number) => {
  const shallowState = todos.value
  shallowState[index].completed = !shallowState[index].completed
  todos.value = shallowState
}

const resetCount = () => {
  completedCount.value = 0
  writeLocalStorage('todoodle-completedCount', completedCount.value)
}
</script>

<template>

<div id="app">

  <h1 className="header">Vue</h1>

  <div className="completed-wrapper">
    <h3 className="completed-count">
      {{ completedCount }} completed tasks
    </h3>
    <button className="completed-reset" @click="resetCount">Reset</button>
  </div>

  <div className="input-wrapper">
    <input
      className="input-input"
      type="text"
      placeholder="Create a new to-do"
      v-model="input"
      @keydown.enter="addTodo"
    />
    <button className="input-button" @click="addTodo">Add</button>
  </div>

  <div className="todos-wrapper">
    <div 
      v-for="(task, index) in todos"
      class="todos-container"
      :class="{'completed': task.completed}"
      @click="toggleTodo(index)"
    >
      <span className="todos-todo">{{ task.value }}</span>
      <button className="todos-delete" @click.stop="removeTodo(index)"/>
    </div>
  </div>

</div>

</template>

<style scoped>
h1 {
  color: #66bb6a;
  text-shadow: 1px 1px #388e3c, 2px 2px #1b5e20;
}
</style>

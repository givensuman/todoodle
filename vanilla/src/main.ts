import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const append = (child: HTMLElement[], parent?: HTMLElement) => {
  if (parent) {
    child.forEach(child => parent.append(child))
    return parent
  }
  else {
    child.forEach(child => app.append(child))
    return app
  }
}

// Header 
const header = document.createElement('h1')
header.innerHTML = 'Vanilla'
header.classList.add('header')

// Input
const inputInput = document.createElement('input')
inputInput.placeholder = 'Create new to-do'
inputInput.classList.add('input-input')

const inputSubmit = document.createElement('button')
inputSubmit.innerHTML = 'Add'
inputSubmit.classList.add('input-button')
inputSubmit.onclick = () => {
  addTodo(inputInput.value)
  inputInput.value = ""
}

const inputWrapper = document.createElement('div')
inputWrapper.classList.add('input-wrapper')

const input = append([inputInput, inputSubmit], inputWrapper)

// Todos
const todos = document.createElement('div')
todos.classList.add('todos-wrapper')

const addTodo = (value: string) => {
  if (value === "") return
  const newTodo = document.createElement('span')
  newTodo.innerHTML = value
  newTodo.classList.add('todos-todo')

  const deleteTodo = document.createElement('button')
  deleteTodo.classList.add('todos-delete')
  deleteTodo.onclick = () => removeTodo(todoContainer)

  const todoContainer = document.createElement('div')
  todoContainer.classList.add('todos-container')
  todoContainer.onclick = () => handleTodo(todoContainer)

  const todo = append([newTodo, deleteTodo], todoContainer)

  append([todo], todos)
}

const handleTodo = (todo: HTMLSpanElement) => {
  if (!todo.classList.contains('complete')) todo.classList.add('complete')
  else todo.classList.remove('complete')
}

const removeTodo = (todo: HTMLSpanElement) => { 
  todos.removeChild(todo)
}


const divider = document.createElement('div')
divider.classList.add('divider')

append([header, input, divider, todos])
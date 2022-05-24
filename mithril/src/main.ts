import '../../style.css'
import m from 'mithril'

type Todo = {
  value: string,
  completed: boolean
}
let todos: Todo[] = []
let completedCount: number = 0
let input: string = ""

const root = document.body

const readLocalStorage = (key: string, fallback: any) => {
  if (localStorage.getItem(key)) return JSON.parse(localStorage[key])
  else return fallback
}

const writeLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const addTodo = () => {
  if (input !== "") {
    todos = [...todos, { value: input, completed: false }]
    input = ""
  }
}

const removeTodo = (index: number) => {
  if (todos[index].completed) completedCount++
  todos = todos.filter((_, i) => i !== index)
}

const toggleTodo = (index: number) => { todos[index].completed = !todos[index].completed }

const resetCount = () => { completedCount = 0 }

const App = {
  oninit: function() {
    todos = readLocalStorage('todoodle--todos', [])
    completedCount = readLocalStorage('todoodle--completedCount', 0)
  },
  onupdate: function() {
    writeLocalStorage('todoodle--todos', todos)
    writeLocalStorage('todoodle--completedCount', completedCount)
  },
  view: function() {
    return m("#app", [

      // Header
      m("h1.header", {
        style: "color: #90a4ae; text-shadow: 1px 1px 1px #607d8b, 2px 2px 2px #455a64, 3px 3px 3px #263238;"
        }, "Mithril"),

      // Completed
      m(".completed-wrapper", [
        m("h3.completed-count", `${completedCount} completed tasks`),
        m("button.completed-reset", { onclick: resetCount }, "Reset")
      ]),

      // Input
      m(".input-wrapper", [
        m("input.input-input", {
          placeholder: "Create a new to-do",
          value: input,
          oninput: function(e: { currentTarget: { value: string } }) { 
            input = e.currentTarget.value 
          },
          onkeydown: function(e: KeyboardEvent) { e.key === 'Enter' && addTodo() }
        }),
        m("button.input-button", { onclick: addTodo }, "Add")
      ]),

      // Todos
      m(".todos-wrapper", todos.map((task, index) => 
          m(".todos-container", {
            class: task.completed ? "completed" : "",
            onclick: function() { toggleTodo(index) } 
          }, [
            m("span.todos-todo", task.value),
            m("button.todos-delete", { onclick: function(e: MouseEvent) {
              e.stopPropagation()
              removeTodo(index)
            }})
          ])
        ))
    ])
  }
}

m.mount(root, App)
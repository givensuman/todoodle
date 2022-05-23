import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import '../../style.css'

const App = () => {

  type Todo = {
    value: string,
    completed: boolean
  }
  const [ todos, setTodos ] = useState<Todo[]>([])
  const [ completedCount, setCompletedCount ] = useState(0)
  const [ input, setInput ] = useState("")

  const readLocalStorage = (key: string, fallback: any) => {
    if (localStorage.getItem(key)) return JSON.parse(localStorage[key])
    else return fallback
  }

  const writeLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  useEffect(() => {
    setTodos(readLocalStorage('todoodle--todos', []))
    setCompletedCount(readLocalStorage('todoodle--completedCount', 0))
  }, [])

  useEffect(() => {
    writeLocalStorage('todoodle--todos', todos)
  }, [todos])

  useEffect(() => {
    writeLocalStorage('todoodle--completedCount', completedCount)
  }, [completedCount])

  const addTodo = () => {
    if (input === "") return
    setTodos(state => [...state, { value: input, completed: false }])
    setInput('')
  }

  const toggleTodo = (index: number) => {
    const shallowState = [...todos]
    shallowState[index].completed = !shallowState[index].completed
    setTodos(shallowState)
  }

  const removeTodo = (index: number) => {
    if (todos[index].completed) setCompletedCount(state => state + 1)
    setTodos(state => state.filter((_, i) => i !== index))
  }

  const resetCount = () => {
    setCompletedCount(0)
  }

  return (
    <div id="app">

    <h1 
      className="header"
      style={{
        color: "#64b5f6",
        textShadow: "1px 1px 1px #2196f3, 2px 2px 2px #1976d2, 3px 3px 3px #0d47a1"
      }}
    >
      React
    </h1>

    <div className="completed-wrapper">
      <h3 className="completed-count">{completedCount} completed tasks</h3>
      <button 
        className="completed-reset"
        onClick={resetCount}
      >
        Reset
      </button>
    </div>

    <div className="input-wrapper">
      <input 
        className="input-input"
        type="text"
        placeholder="Create a new to-do"
        value={input}
        onInput={e => setInput(e.currentTarget.value)}
        onKeyDown={e => e.key === "Enter" && addTodo()}
      />
      <button
        className="input-button"
        onClick={addTodo}
      >
        Add
      </button>
    </div>

    <div className="todos-wrapper">
      {todos.map((task, index) => 
        <div
          key={index}
          className={`todos-container ${task.completed && "completed"}`}
          onClick={() => toggleTodo(index)}
        >
          <span className="todos-todo">{task.value}</span>
          <button 
            className="todos-delete"
            onClick={e => {
              e.stopPropagation()
              removeTodo(index)
            }}
          />
        </div>
      )}
    </div>

    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

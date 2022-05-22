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

  const getQuote = async () => {
    await fetch('https://type.fit/api/quotes')
      .then(res => res.json())
      .then(data => console.log(data))
  }

  useEffect(() => {
    setTodos(readLocalStorage('todoodle--todos', []))
    setCompletedCount(readLocalStorage('todoodle--completedCount', 0))
    getQuote()
  }, [])

  const addTodo = () => {
    if (input === "") return
    const extendedState = [...todos, {
      value: input, completed: false
    }]
    writeLocalStorage('todoodle--todos', extendedState) 
    setTodos(extendedState)
    setInput('')
  }

  const toggleTodo = (index: number) => {
    const shallowState = [...todos]
    shallowState[index].completed = !shallowState[index].completed
    setTodos(shallowState)
    writeLocalStorage('todoodle--todos', shallowState)
  }

  const removeTodo = (index: number) => {
    if (todos[index].completed) {
      writeLocalStorage('todoodle--completedCount', completedCount + 1)
      setCompletedCount(state => state + 1)
    }
    const filteredState = [...todos].filter((_, i) => i !== index)
    setTodos(filteredState)
    writeLocalStorage('todoodle--todos', filteredState)
  }

  return (
    <div id="app">

    <h1 
      className="header"
      style={{
        color: "#2196f3",
        textShadow: "1px 1px #82b1ff, 2px 2px #263238"
      }}
    >
      React
    </h1>

    <h3 className="completed-count">{completedCount} completed tasks</h3>

    <div className="input-wrapper">
      <input 
        className="input-input"
        type="text"
        placeholder="Create a new to-do"
        value={input}
        onChange={e => setInput(e.target.value)}
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

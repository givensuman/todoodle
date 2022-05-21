import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../../style.css'

interface Todo {
  text: string,
  remove: () => void
}

const Todo = ({ text, remove }: Todo) => {
  const [ isComplete, setIsComplete ] = useState(false)
  return (
    <div
      className={`todos-container ${isComplete && 'complete'}`}
      onClick={e => {
        e.stopPropagation()
        setIsComplete(state => !state)
      }}
    >
      <span className="todos-todo">{text}</span>
      <button 
        className="todos-delete"
        onClick={e => {
          e.stopPropagation()
          remove()
        }}
      />
    </div>
  )
}

const App = () => {

  const [ input, setInput ] = useState("")
  const [ todos, setTodos ] = useState<string[]>([])

  const addTodo = () => {
      setTodos(state => [...state, input])
      setInput("")
  }

  const removeTodo = (index: number) => {
    setTodos(state => state.filter((_, i) => i !== index))
  }

  return (
    <div id="app">

      <h1 
        className="header"
        style={{
          color: "#2196f3"
        }}
      >
        React
      </h1>

      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Create new to-do"
          className="input-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { 
            if (e.key === 'Enter') addTodo() 
          }}
        />
        <button 
          className="input-button"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <div className="divider" />

      <div className="todos-wrapper">
        {todos.map((item, index) => 
            <Todo
              key={index}
              text={item}
              remove={() => removeTodo(index)}
            />
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

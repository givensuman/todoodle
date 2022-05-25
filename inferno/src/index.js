import { render, Component } from 'inferno'
import './style.css' 
// No imports allowed outside src

class App extends Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            completedCount: 0,
            input: ''
        }
    }

    readLocalStorage = (key, fallback) => {
        if (localStorage.getItem(key)) return JSON.parse(localStorage[key])
        else return fallback
    }
    
      writeLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    componentDidMount() {
        this.setState({
            todos: this.readLocalStorage('todoodle--todos', []),
            completedCount: this.readLocalStorage('todoodle--completedCount', 0)
        })
    }

    componentDidUpdate(prev) {
        if (this.state.todos !== prev.todos) {
            this.writeLocalStorage('todoodle--todos', this.state.todos)
        }
        if (this.state.completedCount !== prev.completedCount) {
            this.writeLocalStorage('todoodle--completedCount', this.state.completedCount)
        }
    }

    addTodo() {
        if (this.state.input !== '') {
            this.setState({
                todos: [...this.state.todos, { value: this.state.input, completed: false }],
                input: ''
            })
        }
    }

    removeTodo(index) {
        if (this.state.todos[index].completed) this.setState({ completedCount: this.state.completedCount + 1 })
        this.setState({
            todos: this.state.todos.filter((_, i) => i !== index)
        })
    }

    toggleTodo(index) {
        const shallowState = [...this.state.todos]
        shallowState[index].completed = !shallowState[index].completed
        this.setState({
            todos: shallowState
        })
    }

    render() {
      return (
        <div className="app" style={{
            'max-width': '400px',
            'margin': '0 auto'
        }}>
          
            <h1 
                className="header"
                style={{
                    'color': '#ff8a65',
                    'text-shadow': '1px 1px 1px #ff5722, 2px 2px 2px #e64a19, 3px 3px 3px #bf360c'
                }}
            >
                Inferno
            </h1>

            <div className="completed-wrapper" style={{
                'width': 'fit-content',
                'margin': '0 auto'
            }}>
                <h3 className="completed-count">
                    {this.state.completedCount} completed tasks
                </h3>
                <button 
                    className="completed-reset"
                    onClick={() => this.setState({ completedCount: 0 })}
                >
                    Reset
                </button>
            </div>

            <div className="input-wrapper">
                <input
                    className="input-input"
                    type="text"
                    placeholder="Create a new to-do"
                    value={this.state.input}
                    onInput={e => this.setState({ input: e.currentTarget.value })}
                    onKeyDown={e => e.key === 'Enter' && this.addTodo()}
                />
                <button 
                    className="input-button"
                    onClick={() => this.addTodo()}
                >
                    Add
                </button>
            </div>

            <div className="todos-wrapper">
                {this.state.todos.map((task, index) => 
                    <div
                        className={`todos-container ${task.completed && 'completed'}`}
                        onClick={() => this.toggleTodo(index)}
                    >
                        <span className="todos-todo">{task.value}</span>
                        <button 
                            className="todos-delete"
                            onClick={() => this.removeTodo(index)} 
                        />
                    </div>
                )}
            </div>

        </div>
      )
    }
  }

render(<App />, document.getElementById('root'))

/* @refresh reload */
import { createSignal, createEffect, onMount, For } from 'solid-js'
import { render } from 'solid-js/web'
import '../../style.css'

const App = () => {

    type Todo = {
        value: string,
        completed: boolean
    }
    const [ todos, setTodos ] = createSignal<Todo[]>([])
    const [ completedCount, setCompletedCount ] = createSignal(0)
    const [ input, setInput ] = createSignal("")

    const readLocalStorage = (key: string, fallback: any) => {
        if (localStorage.getItem(key)) return JSON.parse(localStorage[key])
        else return fallback
    }

    const writeLocalStorage = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    onMount(() => {
        setTodos(readLocalStorage('todoodle--todos', []))
        setCompletedCount(readLocalStorage('todoodle--completedCount', 0))
    })

    createEffect(() => {
        writeLocalStorage('todoodle--todos', todos())
        writeLocalStorage('todoodle--completedCount', completedCount())
    })

    const addTodo = () => {
        if (input() !== "") {
            setTodos(state => [...state, { value: input(), completed: false }])
            setInput("")
        }
    }

    const removeTodo = (index: number) => {
        if (todos()[index].completed) setCompletedCount(state => state + 1)
        setTodos(state => state.filter((_, i) => i !== index))
    }

    const toggleTodo = (index: number) => {
        const shallowState = [...todos()]
        shallowState[index].completed = !shallowState[index].completed
        setTodos(shallowState)
    }

    const resetCount = () => setCompletedCount(0)

    return (
        <div id="app">

            <h1 
                class="header"
                style={{
                    'color': '#7dd3fc',
                    'text-shadow': 
                        '1px 1px 1px #0ea5e9, 2px 2px 2px #0369a1, 3px 3px 3px #0c4a6e'
                }}
            >
                Solid
            </h1>

            <div class="completed-wrapper">
                <h3 class="completed-count">
                    {completedCount} completed tasks
                </h3>
                <button 
                    class="completed-reset" 
                    onClick={resetCount}
                >
                    Reset
                </button>
            </div>

            <div class="input-wrapper">
                <input
                    class="input-input"
                    type="text"
                    placeholder="Create a new to-do"
                    value={input()}
                    onInput={e => setInput(e.currentTarget.value)}
                    onKeyDown={e => e.key === 'Enter' && addTodo()}
                />
                <button
                    class="input-button"
                    onClick={addTodo}
                >
                    Add
                </button>
            </div>

            <div class="todos-wrapper">
                <For each={todos()}>{(task, index) => 
                    <div
                        class="todos-container" 
                        // classList={{ completed: task.completed }}
                        classList={{ completed: todos()[index()].completed }}
                        onClick={() => toggleTodo(index())}
                    >
                        <span class="todos-todo">{task.value}</span>
                        <button 
                            class="todos-delete" 
                            onClick={e => {
                                e.stopPropagation()
                                removeTodo(index())
                            }} 
                        />
                    </div>
                }</For>
            </div>

        </div>
    )
}

render(() => <App />, document.getElementById('root') as HTMLElement)

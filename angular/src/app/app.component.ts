import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'

type Todo = {
  value: string,
  completed: boolean
}

@Component({
  selector: 'app-root',
  styleUrls: ['../../../style.css'],
  styles: ['h1 { color: #e57373; text-shadow: 1px 1px 1px #f44336, 2px 2px 2px #d32f2f, 3px 3px 3px #b71c1c};'],
  template:`
    <div id='app'>

      <h1 class='header'>Angular</h1>

      <div class="completed-wrapper">
        <h3 class="completed-count">
          {{ completedCount }} completed tasks
        </h3>
        <button 
          class="completed-reset"
          (click)="completedCount = 0"
        >
          Reset
        </button>
      </div>

      <div class="input-wrapper">
        <input 
          class="input-input"
          type="text"
          name="input-thing"
          [(ngModel)]="input"
        />
        <button 
          class="input-button"
          (click)="addTodo()"
        >
          Add
        </button>
      </div>

      <div class="todos-wrapper">
        <div 
          class="todos-container"
          *ngFor="let task of todos; let index = index;"
          [class.completed]="task.completed"
          (click)="toggleTodo(index)"
        >
          <span class="todos-todo">{{ task.value }}</span>
          <button 
          class="todos-delete"
          (click)="removeTodo(index)"
          ></button>
        </div>
      </div>

    </div>
  `
})
export class AppComponent implements OnInit, DoCheck {
  title = 'angular'

  todos: Todo[] = []
  completedCount: number = 0
  input: string = ""


  readLocalStorage = (key: string, fallback: any) => {
    if (localStorage.getItem(key)) return JSON.parse(localStorage[key])
    else return fallback
  }

  writeLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  ngOnInit(): void {
      this.todos = this.readLocalStorage('todoodle--todos', [])
      this.completedCount = this.readLocalStorage('todoodle--completedCount', 0)
  }

  oldTodos: Todo[] = []
  oldCompletedCount: number = 0

  ngDoCheck() {
    if (this.todos !== this.oldTodos) {
      this.writeLocalStorage('todoodle--todos', this.todos)
      this.oldTodos = this.todos
    }
    if (this.completedCount !== this.oldCompletedCount) {
      this.writeLocalStorage('todoodle--completedCount', this.completedCount)
      this.oldCompletedCount = this.completedCount
    }
  }

  handleInput = (e: { currentTarget: { value: string } }) => 
    { this.input = e.currentTarget.value }

  addTodo = () => {
    if (this.input !== "") {
      this.todos = [...this.todos, { value: this.input, completed: false }]
    }
  }

  removeTodo = (index: number) => {
    if (this.todos[index].completed) this.completedCount++
    this.todos = this.todos.filter((_, i) => i !== index)
  }

  toggleTodo = (index: number) => {
    this.todos[index].completed = !this.todos[index].completed
  }
}

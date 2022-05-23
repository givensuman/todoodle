<script lang="ts">
  import "../../style.css";
  import { onMount } from "svelte";

  type Todo = {
    value: string;
    completed: boolean;
  };
  let todos: Todo[] = [];
  let completedCount = 0;
  let input = "";

  const readLocalStorage = (key: string, fallback: any) => {
    if (localStorage.getItem(key)) return JSON.parse(localStorage[key]);
    else return fallback;
  };

  const writeLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  onMount(() => {
    todos = readLocalStorage("todoodle--todos", []);
    completedCount = readLocalStorage("todoodle--completedCount", 0);
  });

  $: if (todos.length > 0) writeLocalStorage("todoodle--todos", todos);
  $: if (completedCount > 0)
    writeLocalStorage("todoodle--completedCount", completedCount);

  const addTodo = () => {
    if (input !== "") {
      todos = [...todos, { value: input, completed: false }];
      input = "";
    }
  };

  const toggleTodo = (index: number) => {
    todos[index].completed = !todos[index].completed;
  };

  const removeTodo = (index: number) => {
    if (todos[index].completed) completedCount++;
    todos = todos.filter((_, i) => i !== index);
  };

  const resetCount = () => {
    completedCount = 0;
    writeLocalStorage("todoodle--completedCount", 0);
  };
</script>

<main>
  <div id="app">
    <h1 class="header">Svelte</h1>

    <div class="completed-wrapper">
      <h3 class="completed-count">{completedCount} completed tasks</h3>
      <button class="completed-reset" on:click={resetCount}>Reset</button>
    </div>

    <div class="input-wrapper">
      <input
        class="input-input"
        type="text"
        placeholder="Create a new to-do"
        bind:value={input}
        on:keydown={(e) => e.key === "Enter" && addTodo()}
      />
      <button class="input-button" on:click={addTodo}>Add</button>
    </div>

    <div class="todos-wrapper">
      {#each todos as task, index}
        <div
          class="todos-container"
          class:completed={todos[index].completed}
          on:click={() => toggleTodo(index)}
        >
          <span class="todos-todo">{task.value}</span>
          <button
            class="todos-delete"
            on:click|stopPropagation={() => removeTodo(index)}
          />
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  .header {
    color: #ff8a65;
    text-shadow: 1px 1px 1px #ff5722, 2px 2px 2px #e64a19, 3px 3px 3px #bf360c;
  }
</style>

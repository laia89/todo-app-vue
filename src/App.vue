<script setup>
import { ref, watch } from 'vue'

const todos = ref([])
const text = ref('')

function addTodo() {
  if (text.value.trim() === '') {
    return
  }

  const todo = {
    todo: text.value,
    completed: false
  }

  todos.value.unshift(todo)
  text.value = ''
}

function deleteTodo(todo) {
  todos.value = todos.value.filter((x) => x !== todo)
}

watch(
  todos,
  (newTodo) => {
    localStorage.setItem('todos', JSON.stringify(newTodo))
  },
  { deep: true }
)
</script>

<template>
  <header class="app">
    <section class="greeting">
      <h3 class="title">ToDo Application</h3>
    </section>
    <div class="input-section">
      <section class="create-todo">
        <form @submit.prevent="addTodo">
          <h3>What is your main focus for today?</h3>
          <input type="text" placeholder="e.g. Pet your cat" v-model="text" />
          <input type="submit" value="Add todo" />
        </form>
      </section>
    </div>
  </header>

  <main class="app" v-show="todos.length > 0">
    <div class="todo-section">
      <section class="todo-list">
        <div class="list">
          <div v-for="todo in todos" :class="`todo-item ${todo.completed && 'done'}`">
            <label>
              <input type="checkbox" v-model="todo.completed" />
            </label>
            <div class="todo-content">
              <input type="text" v-model="todo.todo" />
            </div>
            <div class="actions">
              <button class="delete" @click="deleteTodo(todo)">Delete</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

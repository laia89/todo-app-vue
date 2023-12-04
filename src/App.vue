<script setup>
import { ref, watch, onMounted } from 'vue'
import api from './api/api'

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

  api
    .addTodo(todo)
    .then(({ data }) => {
      console.log('addTodo POST request OK', data)
      todo.id = data.id
      todos.value.unshift(todo)
      text.value = ''
    })
    .catch((error) => console.log(error))
}

function deleteTodo(todoId) {
  todos.value = todos.value.filter((x) => x.id !== todoId)

  api
    .deleteTodo(todoId)
    .then((response) => {
      console.log('deleteTodo request OK', response)
    })
    .catch((error) => console.log(error))
}

watch(
  todos,
  (newTodo) => {
    localStorage.setItem('todos', JSON.stringify(newTodo))
  },
  { deep: true }
)

onMounted(() => {
  const todosStored = localStorage.getItem('todos')
  if (todosStored === null) {
    api
      .listTodos()
      .then(({ data }) => {
        console.log('listTodos GET request OK', data)
        todos.value = data.todos
      })
      .catch((error) => console.log(error))
  } else {
    todos.value = JSON.parse(todosStored) || []
  }
})
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
          <input type="text" placeholder="e.g. Pet my cat" v-model="text" />
          <input type="submit" value="Add todo" />
        </form>
      </section>
    </div>
  </header>

  <main class="app" v-show="todos.length > 0">
    <div class="todo-section">
      <section class="todo-list">
        <div class="list">
          <div
            v-for="todo in todos"
            :key="todo.id"
            :class="`todo-item ${todo.completed && 'done'}`"
          >
            <label>
              <input type="checkbox" v-model="todo.completed" />
            </label>
            <div class="todo-content">
              <input type="text" v-model="todo.todo" />
            </div>
            <div class="actions">
              <button class="delete" @click="deleteTodo(todo.id)">Delete</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import api from './api/api'

const toast = useToast()

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
      todo.id = data.id
      todo.userId = data.userId
      todos.value.unshift(todo)
      text.value = ''
    })
    .catch((error) => {
      console.error(error)
      toast.error('Oops, we could not add this task in our system.')
    })
}

function deleteTodo(todoId) {
  todos.value = todos.value.filter((x) => x.id !== todoId)

  api
    .deleteTodo(todoId)
    .then((response) => {
      console.log('deleteTodo request OK', response)
    })
    .catch((error) => {
      console.error(error)
      toast.error('Oops, we could not delete this task in our system.')
    })
}

function updateTodo(todo) {
  api
    .updateTodo(todo.id, { todo: todo.todo, completed: todo.completed })
    .then(() => toast.success('Good job!'))
    .catch((error) => {
      console.error(error)
      toast.error('Oops, we could not update this task.')
    })
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
        todos.value = data.todos
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          `We're sorry, we're not able to retrieve your todos at the moment, please try again later.`
        )
      })
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
            :class="`todo-item ${todo.completed ? 'done' : ''}`"
          >
            <label>
              <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)" />
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

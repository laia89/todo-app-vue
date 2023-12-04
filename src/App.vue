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

  <main class="app"></main>
</template>

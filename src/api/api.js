import axios from 'axios'

const baseURL = 'https://dummyjson.com'
const userId = 1

const dummyInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

export default {
  listTodos: () => dummyInstance.get(`/todos/user/${userId}`),
  updateTodo: (id, data) => dummyInstance.put(`/todos/${id}`, JSON.stringify(data)),
  addTodo: (todo) => dummyInstance.post(`/todos/add`, JSON.stringify({ ...todo, userId })),
  deleteTodo: (id) => dummyInstance.delete(`/todos/${id}`)
}

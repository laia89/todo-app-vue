import { describe, it, expect, afterAll, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import App from './App.vue'
import api from './api/api.js'

const mockTodoList = [
  {
    id: 17,
    todo: 'Create a cookbook with favorite recipes',
    completed: false,
    userId: 1
  },
  { id: 18, todo: 'Bake a pie with some friends', completed: false, userId: 1 },
  { id: 54, todo: 'Start a daily journal', completed: false, userId: 1 },
  {
    id: 100,
    todo: 'Learn a new programming language',
    completed: true,
    userId: 1
  },
  { id: 141, todo: 'Visit a nearby museum', completed: true, userId: 1 }
]

describe("App", () => {
  // Spy on the api.listTodos method
  const mockedListTodos = vi.spyOn(api, 'listTodos')
    mockedListTodos.mockReturnValueOnce(Promise.resolve({ data: { todos: mockTodoList } }))

  afterAll(() => {
      mockedListTodos.mockRestore()
  })

  it('should render the header', async () => {
    const wrapper = mount(App)

    expect(wrapper.find('h1').exists()).toBeTruthy()
    expect(wrapper.find('h3').exists()).toBeTruthy()
    expect(wrapper.get('[data-test="form"]').exists()).toBeTruthy()
  })

  it('sets a todo value', async () => {
    const wrapper = mount(App)
    const input = wrapper.get('[data-test="new-todo"]')

    await input.setValue('New todo')
    expect(input.element.value).toBe('New todo')
  })

  it('fetches todos and list them in the DOM', async () => {
    const wrapper = mount(App)

    // Wait for all pending promises to resolve
    await flushPromises()
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(5)
  })

  it('creates a new todo value', async () => {
    const newTodo = {
      id: 151,
      todo: 'New todo',
      completed: false,
      userId: 1
    }
    // Spy on the api.addTodo method
    const mockedAddTodo = vi.spyOn(api, 'addTodo')
    mockedAddTodo.mockReturnValueOnce(Promise.resolve({ data: newTodo }))

    const wrapper = mount(App)

    const input = wrapper.get('[data-test="new-todo"]')

    await input.setValue(newTodo.todo)
    expect(input.element.value).toBe(newTodo.todo)

    await wrapper.get('[data-test="form"]').trigger('submit')

    await flushPromises()
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(6)
    mockedAddTodo.mockRestore()
  })

  it('completes the first todo', async () => {
    const wrapper = mount(App)

    await flushPromises()
    expect(wrapper.findAll('[data-test="todo"]').at(1).classes()).not.toContain('done')
    await wrapper.findAll('input[type=checkbox]').at(1).setChecked()
    expect(wrapper.findAll('[data-test="todo"]').at(1).classes()).toContain('done')
  })
})

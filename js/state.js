import { loadTodos, saveTodos } from './storage.js';
import { addTodo, toggleTodo, deleteTodo, filterTodos, clearCompleted } from './todo-logic.js';

let state = {
  todos: loadTodos(),
  filter: 'all'
};

export const getState = () => state;

export const dispatchAddTodo = (text) => {
  state.todos = addTodo(state.todos, text);
  saveTodos(state.todos);
};

export const dispatchToggleTodo = (id) => {
  state.todos = toggleTodo(state.todos, id);
  saveTodos(state.todos);
};

export const dispatchDeleteTodo = (id) => {
  state.todos = deleteTodo(state.todos, id);
  saveTodos(state.todos);
};

export const dispatchSetFilter = (newFilter) => {
  state.filter = newFilter;
};

export const getFilteredTodos = () => {
  return filterTodos(state.todos, state.filter);
};

export const dispatchClearCompleted = () => {
    state.todos = clearCompleted(state.todos);
    saveTodos(state.todos);
}

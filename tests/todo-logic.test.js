import { test } from "node:test";
import assert from "node:assert/strict";
import { addTodo, toggleTodo, } from "../js/todo-logic.js";

test("addTodo adds a new task correctly", () => {
  const todos = [];
  const result = addTodo(todos, "Master JavaScript modules");
  assert.equal(result.length, 1);
  assert.equal(result[0].text, "Master JavaScript modules");
});

test("addTodo does not mutate the original array", () => {
  const todos = [{ id: 1, text: "Existing task", completed: false }];
  addTodo(todos, "New task");
  assert.equal(todos.length, 1);
});

test("addTodo ignores empty and whitespace-only text", () => {
  const todos = [{ id: 1, text: "Existing task", completed: false }];
  assert.deepEqual(addTodo(todos, ""), todos);
  assert.deepEqual(addTodo(todos, "   "), todos);
});

test("toggleTodo flips completed for a specific task", () => {
  const todos = [{ id: 1, text: "Test task", completed: false }];
  const result = toggleTodo(todos, 1);
  assert.equal(result[0].completed, true);
  assert.equal(todos[0].completed, false);
});
import { dispatchAddTodo, dispatchToggleTodo, dispatchDeleteTodo, dispatchSetFilter, getFilteredTodos, dispatchClearCompleted } from './state.js';
import { renderTodoList } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const filterButtons = document.querySelectorAll('.filter-btn');

  const updateView = () => {
    const filtered = getFilteredTodos();
    renderTodoList(filtered, {
      onToggle: (id) => {
        dispatchToggleTodo(id);
        updateView();
      },
      onDelete: (id) => {
        dispatchDeleteTodo(id);
        updateView();
      }
    });
  };

  // Handle adding new items via form submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input) return;
      dispatchAddTodo(input.value);
      input.value = '';
      updateView();
    });
  }

  // Handle filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filterValue = e.target.getAttribute('data-filter');
      dispatchSetFilter(filterValue);
      updateView();
    });
  });

  //Handle clear completed

  const clearBtn = document.getElementById('clear-completed');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        dispatchClearCompleted();
        updateView();
    });
  }

  // Initial render on load
  updateView();
});

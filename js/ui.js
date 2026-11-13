export const renderTodoList = (todos, { onToggle, onDelete}) => {
    const listContainer = document.getElementById('todo-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    if (todos.length === 0) {
        listContainer.innerHTML = `<li class="empty-msg">No tasks found.</li>`;
        return;
    }

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
           <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}" />
           <span class="todo-text">${escapeHtml(todo.text)}</span>
           <button class="delete-btn" data-id="${todo.id}">Delete</button>
        `;

        const checkbox = li.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => onToggle(todo.id));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => onDelete(todo.id));

        listContainer.appendChild(li);
    });
};

const escapeHtml = (str) => {
    return str.replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', "'": '&#39;', '"': '&quot;'}[tag] || tag)
    );
};
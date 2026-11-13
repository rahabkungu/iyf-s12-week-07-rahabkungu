const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const formError = document.getElementById("form-error");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

let todos = [];
let currentFilter = "all";
let nextId = 1;
let editingId = null;

function createTodoElement(todo){
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;

    if (todo.completed) {
        li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "toggle";
    checkbox.checked = todo.completed;

    li.appendChild(checkbox)

    if (editingId === todo.id) {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit";
        editInput.value = todo.text;

        editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const newText = editInput.value.trim();
                if (newText !== "") {
                    todo.text =newText;
                }
                editingId = null;
                render();
            }   else if (event.key === "Escape") {
                editingId = null;
                render();
            }
        });

        editInput.addEventListener("blur", () => {
            editingId = null;
            render();
        });

        li.appendChild(editInput);

        setTimeout(() => editInput.focus(), 0);
    }   else{
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;
        li.appendChild(span);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete";
    deleteBtn.textContent = "X";
    deleteBtn.setAttribute("aria-label", `delete "${todo.text}"`);

    li.appendChild(deleteBtn);

    return li;
}

function visibleTodos() {
    return todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true; // "all"
    });
}

function render() {
    todoList.replaceChildren(...visibleTodos().map(createTodoElement));
    updateStats();
}

function updateStats() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount === 1 ? "" : "s" } left`;
}

function addTodo(text) {
    todos.push({
        id: nextId++,
        text: text,
        completed: false
    });
    render();
}

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const text = input.value.trim();
    if (text === "") {
        formError.textContent = "Type a task first.";
        return;
    }
    formError.textContent = "";
    addTodo(text);
    input.value = "";
    input.focus();
});

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed};
        }
        return todo;
    });
    render();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
}

todoList.addEventListener("click", (event) => {
    const item = event.target.closest(".todo-item");
    if (!item) return;

    const id = Number(item.dataset.id);

    if ( event.target.closest(".delete")) {
        deleteTodo(id);
        return;
    }
    toggleTodo(id);
});

function filterTodos(filter) {
    currentFilter = filter;

    filters.forEach(btn => {
        const matches = btn.dataset.filter === filter;
        btn.classList.toggle("active", matches);
        btn.setAttribute("aria-pressed", matches ? "true" : "false");
    });
    render();
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    render();
}

clearCompletedBtn.addEventListener("click", clearCompleted);

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        filterTodos(btn.dataset.filter);
    });
});

todoList.addEventListener("dblclick", (event) => {
    const item = event.target.closest(".todo-item");
    if (!item) return;

    const id = Number(item.dataset.id);

    if (event.target.classList.contains("todo-text")){
        editingId = id;
        render();
    }
});

render();
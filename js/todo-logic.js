//js/todo-loic.js
//pure logic only - no DOM or localstorage

export const addTodo = (todos, text) => {
    if (!text || !text.trim()) return todos;
    const newTodo = { id: Date.now(), text: text.trim(), completed: false};
    return [...todos, newTodo];
};

export const toggleTodo = (todos, id) => {
    return todos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed } : todo
    );
};

export const deleteTodo = (todos, id) => {
    return todos.filter(todo => todo.id !== id);
};

export const filterTodos = (todos, filter) => {
    if (filter === 'completed') return todos.filter(todo => todo.completed);
    if (filter === 'active') return todos.filter(todo => !todo.completed);
    return todos;
};

export const clearCompleted =(todos) => {
    return todos.filter(todo => !todo.completed);
};
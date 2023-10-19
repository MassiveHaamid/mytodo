// App.jsx
import React, { useState } from 'react';
import './styles/App.css';

const initialTodos = [
  { id: 1, name: 'Task 1', description: 'Description 1', status: 'not completed' },
  { id: 2, name: 'Task 2', description: 'Description 2', status: 'completed' },
  // Add more initial todos if needed
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);

  const addTodo = (name, description) => {
    const newTodo = {
      id: todos.length + 1,
      name,
      description,
      status: 'not completed',
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodoStatus = (id, newStatus) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, status: newStatus } : todo));
    setTodos(updatedTodos);
  };

  const startEditing = (id) => {
    setEditingTodo(id);
  };

  const saveEdit = (id, newName, newDescription) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, name: newName, description: newDescription } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const filterTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.status === 'completed');
      case 'not completed':
        return todos.filter((todo) => todo.status === 'not completed');
      default:
        return todos;
    }
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div>
        <label htmlFor="filter">Filter:</label>
        <select id="filter" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>
      <div>
        <h2>Add Todo</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const description = e.target.description.value;
            addTodo(name, description);
            e.target.reset();
          }}
        >
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" required />
          <button type="submit">Add Todo</button>
        </form>
      </div>
      <div>
        <h2>Todos</h2>
        {filterTodos().map((todo) => (
          <div className="todo-card" key={todo.id}>
            {editingTodo === todo.id ? (
              <>
                <label htmlFor={`editName${todo.id}`}>Edit Name:</label>
                <input type="text" id={`editName${todo.id}`} defaultValue={todo.name} />
                <label htmlFor={`editDescription${todo.id}`}>Edit Description:</label>
                <input type="text" id={`editDescription${todo.id}`} defaultValue={todo.description} />
                <button onClick={() => saveEdit(todo.id, document.getElementById(`editName${todo.id}`).value, document.getElementById(`editDescription${todo.id}`).value)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{todo.name}</h3>
                <p>{todo.description}</p>
                <label htmlFor={`status${todo.id}`}>Status:</label>
                <select id={`status${todo.id}`} value={todo.status} onChange={(e) => updateTodoStatus(todo.id, e.target.value)}>
                  <option value="completed">Completed</option>
                  <option value="not completed">Not Completed</option>
                </select>
                <button onClick={() => startEditing(todo.id)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ToDo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('https://to-do-server-chi.vercel.app/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo === '') return;
    axios.post('https://to-do-server-chi.vercel.app/todos', { text: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`https://to-do-server-chi.vercel.app/todos/${id}`)
      .then(response => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="container mx-auto max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">To-Do List</div>
        <ul>
          {todos.map(todo => (
            <li key={todo._id} className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-700">{todo.text}</span>
              </label>
              <button onClick={() => handleDelete(todo._id)} className="ml-4 text-red-500 hover:text-red-800">
                Delete
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            className="border rounded-full py-2 px-3"
            type="text"
            placeholder="Add a new to-do"
          />
        </form>
      </div>
    </div>
  );
}

export default ToDo;

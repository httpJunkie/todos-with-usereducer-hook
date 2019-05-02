import React, { useReducer, useRef, useEffect } from 'react';
import { render } from 'react-dom';

import './style.css';
import * as constants from './constants';
import todosReducer from './todosReducer';

const initialState = [...constants.TODOS];

const Todo = () => {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todosReducer, initialState);
  const completedTodos = todos.filter(
    (todo) => { return todo.complete }
  );

  useEffect(() => {
    document.title = `You have ${completedTodos.length} items completed!`;
  })

  const addTodo = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_TODO',
      name: inputRef.current.value,
      complete: false
    });
    inputRef.current.value = '';
  }
  const toggleComplete = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', id });
  }
  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', id });
  }
  const clearTodos = () => {
    dispatch({ type: 'CLEAR_TODOS' });
  }

  return (
    <>
      <div className="todo-input">
        <form onSubmit={addTodo}>
          <input ref={inputRef} type="search" id="add-todo" placeholder="Add Todo..." />
        </form>
      </div>
      <div className="column-container">
        {todos.map((todo) => (
          <div
            className={`column-item ${todo.complete ? 'completed' : null}`}
            key={todo.id}
          >
            <div className="flex-container">
              <div className="todo-name" onClick={() => toggleComplete(todo.id)}>
                {todo.name}
              </div>
              <div className="todo-delete" onClick={() => deleteTodo(todo.id)}>
                &times;
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => clearTodos()}>
        CLEAR TODOS
      </button>
    </>
  );
}

render(<Todo />, document.getElementById('root'));

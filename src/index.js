import React, { useReducer, useRef } from 'react'; // 00: add imports
import { render } from 'react-dom';

import './style.css';
import * as constants from './constants';

const initialState = [...constants.TODOS];
const todosReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return (action.name.length)
        ? [...state, {
          id: state.length
            ? Math.max(...state.map(todo => todo.id)) + 1
            : 0,
          name: action.name,
          complete: false
        }]
        : state
    }
    default: {
      return state;
    }
  }
} // 02: add reducer function and switch statement

const Todo = () => {
  const inputRef = useRef(); // 04: add useRef hook (imperative way of using a ref)
  const [todos, dispatch] = useReducer(todosReducer, initialState); // 01: add useReducer

  // 05: add dispatch function for addTodo!
  function addTodo(event) {
    event.preventDefault();
    dispatch({
      type: 'ADD_TODO',
      name: inputRef.current.value,
      complete: false
    });
    inputRef.current.value = '';
  }

  return (
    <>
      { /* 03: add inputRef */}
      <div className="todo-input">
        <form onSubmit={addTodo}>
          <input ref={inputRef} type="search" id="add-todo" placeholder="Add Todo..." />
        </form>
      </div>
      <div className="column-container">
        { /* 06: Change initalState to todos */}
        {todos.map((todo) => (
          <div key={todo.id} alt={todo.id} className="column-item">
            <div className="flex-container">
              <div className="todo-name">{todo.name}</div>
              <div className="todo-delete">&times;</div>
            </div>
          </div>
        ))}
      </div>
      <button>
        CLEAR TODOS
      </button>
    </>
  );
}

render(<Todo />, document.getElementById('root'));

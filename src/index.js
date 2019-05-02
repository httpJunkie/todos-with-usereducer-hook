import React, { useReducer, useRef, useEffect } from 'react';
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
    case 'TOGGLE_COMPLETE': {
      return state.map((item) =>
        item.id === action.id
          ? { ...item, complete: !item.complete }
          : item
      )
    }
    // 03: add case for deleteComplete
    case 'DELETE_TODO': {
      return state.filter((x) => x.id !== action.id);
    }
    default: {
      return state;
    }
  }
}

const Todo = () => {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todosReducer, initialState);
  const completedTodos = todos.filter(
    (todo) => { return todo.complete }
  );

  useEffect(() => {
    document.title = `You have ${completedTodos.length} items completed!`;
  })

  function addTodo(event) {
    event.preventDefault();
    dispatch({
      type: 'ADD_TODO',
      name: inputRef.current.value,
      complete: false
    });
    inputRef.current.value = '';
  }
  function toggleComplete(id) {
    dispatch({ type: 'TOGGLE_COMPLETE', id });
  }
  function deleteTodo(id) {
    dispatch({ type: 'DELETE_TODO', id });
  } // 02: add dispatch function for deleteTodo

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
              {/* 01: Add onClick call to deleteTodo */}
              <div className="todo-delete" onClick={() => deleteTodo(todo.id)}>
                &times;
              </div>
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

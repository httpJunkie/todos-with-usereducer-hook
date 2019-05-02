import React, { useReducer, useRef, useEffect } from 'react'; // 03: import useEffect
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
    // 06: add case for toggleComplete
    case 'TOGGLE_COMPLETE': {
      return state.map((item) =>
        item.id === action.id
          ? { ...item, complete: !item.complete }
          : item
      )
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
  ); // 01: filter todos, so that we can use it's count

  useEffect(() => {
    document.title = `You have ${completedTodos.length} items completed!`;
  }) // 02: update document.title (excuse to show off another hook)

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
  } // 05: add dispatch function for toggleComplete

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
          >{/* 06: add class 'completed' if todo.complete */}
            <div className="flex-container">
              {/* 04: add onClick call to toggleComplete */}
              <div className="todo-name" onClick={() => toggleComplete(todo.id)}
              >{todo.name}</div>
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

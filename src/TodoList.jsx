import React, { memo, useEffect, useCallback, useRef, useState } from "react";
import "./App.css";
import { createSet, createAdd, createRemove, createComplete } from "./action";
import reducer from "./reducer.js";
export default function TodoList() {
  return (
    <div>
      <Contronl />
    </div>
  );
}

const ASYNC_STATE = {};

const TodoItem = memo(function TodoItem(props) {
  const { compeleteTodo, removeTodo, id, text, commpelete } = props;
  const onChange = () => {
    compeleteTodo(id);
  };

  const onRemove = () => {
    removeTodo(id);
  };

  return (
    <div>
      {
        <li className="todo-li">
          <input type="checkbox" checked={commpelete} onChange={onChange} />
          <label className={commpelete ? "line" : ""}>{text}</label>
          <button onClick={onRemove}>&#xd7;</button>
        </li>
      }
    </div>
  );
});

const Todos = memo(function Todos(props) {
  const { todos, compeleteTodo, removeTodo } = props;
  return (
    <>
      <ul>
        {todos.map((item) => {
          return (
            <TodoItem
              {...props}
              id={item.id}
              key={item.id}
              text={item.text}
              commpelete={item.commpelete}
              compeleteTodo={compeleteTodo}
              removeTodo={removeTodo}
            />
          );
        })}
      </ul>
    </>
  );
});

const Contronl = memo(function Contronl() {
  const [todos, setTodos] = useState([]);
  const [increment, setIncrement] = useState(0);

  const inputRef = useRef();

  useEffect(() => {
    Object.assign(ASYNC_STATE, {
      todos,
      increment,
    });
  }, [todos, increment]);
  /* 
    传入的是action创建返回的时候一个只接受payloadde函
    批量生成
     (
      {
        addTodo:createAdd
      },
     dispatch 
     )
  */
  const bindActionCreators = (actionCreators, dispatch) => {
    const ret = {};
    for (const key in actionCreators) {
      ret[key] = (...arg) => {
        const actionCreator = actionCreators[key];
        const action = actionCreator(...arg);
        dispatch(action);
      };
    }
    return ret;
  };

  const dispatch = (action) => {
    const setters = {
      todos: setTodos,
      increment: setIncrement,
    };

    if ("function" === typeof action) {
      action(dispatch, () => ASYNC_STATE);
      return;
    }

    const newState = reducer(ASYNC_STATE, action);
    for (const key in newState) {
      setters[key](newState[key]);
    }
  };

  const throttled = (fn, delay = 500) => {
    const oldTime = Date.now();
    return (fn, delay) => {
      const newTime = Date.now();
      if (newTime - oldTime >= delay) {
        fn();
        oldTime = Date.now();
      }
    };
  };

  const onChangeAdd = (e) => {
    e.preventDefault();
    if (inputRef.current.value.length === 0) {
      return;
    }

    const { addTodo } = bindActionCreators({ addTodo: createAdd }, dispatch);
    addTodo(inputRef.current.value.trim());
    inputRef.current.value = "";
  };

  useEffect(() => {
    const todosList = JSON.parse(localStorage.getItem("todos")) || [];
    const { set } = bindActionCreators({ set: createSet }, dispatch);
    set(todosList);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <div className="todo-list">
        TodoList
        <form onSubmit={onChangeAdd} className="todo-from">
          <input
            type="text"
            ref={inputRef}
            placeholder="why need to be done?"
          />
        </form>
      </div>
      <Todos
        todos={todos}
        {...bindActionCreators(
          { compeleteTodo: createComplete, removeTodo: createRemove },
          dispatch
        )}
      />
    </div>
  );
});

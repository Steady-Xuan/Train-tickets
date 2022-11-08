import React, { memo, useEffect, useCallback, useRef, useState } from "react";
import "./App.css";

export default function TodoList() {
  return (
    <div>
      <Contronl />
    </div>
  );
}

const TodoItem = memo(function TodoItem(props) {
  const { handleRemove, handleCompelete, id, text, commpelete } = props;

  const onChange = () => {
    handleCompelete(id);
  };

  const onRemove = () => {
    handleRemove(id);
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
  const { todos } = props;
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
            />
          );
        })}
      </ul>
    </>
  );
});

const Contronl = memo(function Contronl() {
  const [todos, setTodos] = useState([]);

  const inputRef = useRef();
  const onChangeAdd = (e) => {
    e.preventDefault();
    if (inputRef.current.value.length === 0) {
      return;
    }
    setTodos([
      ...todos,
      {
        text: inputRef.current.value.trim(),
        id: Date.now(),
        commpelete: false,
      },
    ]);
    inputRef.current.value = "";
  };

  useEffect(() => {
    const todosLIst = JSON.parse(localStorage.getItem("todos") || []);

    setTodos(todosLIst);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleRemove = useCallback((id) => {
    setTodos((todos) => {
      const arr = todos.filter((item) => {
        return item.id !== id;
      });
      return [...arr];
    });
  }, []);

  const handleCompelete = useCallback((id) => {
    setTodos((todos) => {
      todos.forEach((item) => {
        if (id === item.id) {
          item.commpelete = !item.commpelete;
        }
      });
      return [...todos];
    });
  }, []);

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
        handleRemove={handleRemove}
        handleCompelete={handleCompelete}
      />
    </div>
  );
});

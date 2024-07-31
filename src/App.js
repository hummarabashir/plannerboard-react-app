import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");


  
  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);



  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
        setTodo("");

    } else {

        alert("Enter Valid Task");
        setTodo("");
    }
  }
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    // const updatedTodos = [...todos].map((todo) => {
    //   if (todo.id === id) {
    //     todo.text = editingText;
    //     }
    //     return todo;
    //   });
    //   setTodos(updatedTodos);
    //   setTodoEditing(null);
    const updatedTodos = todos.map((todo) =>
    todo.id === todoEditing ? { ...todo, text: editingText } : todo
  );
  setTodos(updatedTodos);
  setTodoEditing(null);
    }

    React.useEffect(() => {
      if (todos.length > 0) {
          const json = JSON.stringify(todos);
          localStorage.setItem("todos", json);
      } else {
        localStorage.removeItem("todos");
      }
    }, [todos]);

    return (
        <div id="todo-list">
          <h1>Planner Dashboard</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="addInput"
              placeholder="Type to add a note ..."
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button className="submit" type="submit">Add Note</button>
          </form>
          {todos.length > 0 ? (
            <div className="todo-grid">
          {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <div className="todo-text">
                <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    className="inputText"
                    onChange={(e) => setEditingText(e.target.value)}
                    defaultValue={todo.text}
                  />
                ) : (
                  <div style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</div>
                )}
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>Save</button>
                ) : (
                  <button onClick={() => setTodoEditing(todo.id)}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="edit-icon text-green-900 hover:text-green-600 cursor-pointer" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></button>
                )}

                <button onClick={() => deleteTodo(todo.id)}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="delete-icon text-green-900 hover:text-green-600 cursor-pointer" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg></button>
              </div>
            </div>
          ))}
          </div>
          ) : (
            <p className="subtext">You don't have any tasks yet!!            </p>
          )}
        </div>
      );
    };

export default App;
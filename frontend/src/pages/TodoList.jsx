import { useEffect, useState } from "react";

const API_URL =
  "http://localhost:5000";


function TodoList() {

  const [todos, setTodos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [input, setInput] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editingText, setEditingText] =
    useState("");


  // ========================================
  // LOAD TODOS
  // ========================================

  const loadTodos = async () => {

    try {

      setLoading(true);

      setError("");


      const token =
        localStorage.getItem(
          "token"
        );


      if (!token) {

        throw new Error(
          "Please log in again."
        );

      }


      const response =
        await fetch(
          `${API_URL}/api/todos`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to load todos."
        );

      }


      setTodos(
        data.todos || []
      );


    } catch (error) {

      console.error(
        "Load todos error:",
        error
      );


      setError(
        error.message ||
        "Unable to load todo list."
      );


    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadTodos();

  }, []);


  // ========================================
  // ADD TODO
  // ========================================

  const handleAdd = async (event) => {

    event.preventDefault();


    if (!input.trim()) {

      return;

    }


    try {

      const token =
        localStorage.getItem(
          "token"
        );


      const response =
        await fetch(
          `${API_URL}/api/todos`,
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`

            },

            body: JSON.stringify({

              title:
                input.trim()

            })

          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to add todo."
        );

      }


      setTodos(
        (current) => [
          data.todo,
          ...current
        ]
      );


      setInput("");


    } catch (error) {

      setError(
        error.message
      );

    }

  };


  // ========================================
  // TOGGLE
  // ========================================

  const handleToggle = async (
    todo
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );


      const response =
        await fetch(
          `${API_URL}/api/todos/${todo._id}/toggle`,
          {

            method: "PATCH",

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message
        );

      }


      setTodos(
        (current) =>
          current.map(
            (item) =>
              item._id === todo._id
                ? data.todo
                : item
          )
      );


    } catch (error) {

      setError(
        error.message
      );

    }

  };


  // ========================================
  // START EDIT
  // ========================================

  const startEdit = (
    todo
  ) => {

    setEditingId(
      todo._id
    );

    setEditingText(
      todo.title
    );

  };


  // ========================================
  // SAVE EDIT
  // ========================================

  const saveEdit = async (
    todo
  ) => {

    if (!editingText.trim()) {

      return;

    }


    try {

      const token =
        localStorage.getItem(
          "token"
        );


      const response =
        await fetch(
          `${API_URL}/api/todos/${todo._id}`,
          {

            method: "PUT",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`

            },

            body: JSON.stringify({

              title:
                editingText.trim()

            })

          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message
        );

      }


      setTodos(
        (current) =>
          current.map(
            (item) =>
              item._id === todo._id
                ? data.todo
                : item
          )
      );


      setEditingId(null);

      setEditingText("");


    } catch (error) {

      setError(
        error.message
      );

    }

  };


  // ========================================
  // DELETE
  // ========================================

  const handleDelete = async (
    todo
  ) => {

    const confirmed =
      window.confirm(
        `Delete "${todo.title}"?`
      );


    if (!confirmed) {

      return;

    }


    try {

      const token =
        localStorage.getItem(
          "token"
        );


      const response =
        await fetch(
          `${API_URL}/api/todos/${todo._id}`,
          {

            method: "DELETE",

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message
        );

      }


      setTodos(
        (current) =>
          current.filter(
            (item) =>
              item._id !== todo._id
          )
      );


    } catch (error) {

      setError(
        error.message
      );

    }

  };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (

      <section className="todo-page">

        <h1>
          Todo List
        </h1>

        <p>
          Loading your todo list...
        </p>

      </section>

    );

  }


  // ========================================
  // PAGE
  // ========================================

  return (

    <section className="todo-page">


      <div className="todo-header">

        <div>

          <p className="small-heading">
            STUDY PLANNER
          </p>

          <h1>
            Todo List
          </h1>

          <p>
            Keep track of everything you need to get done.
          </p>

        </div>

      </div>


      {error && (

        <div className="todo-error">
          {error}
        </div>

      )}


      {/* ADD */}

      <form
        className="todo-add-form"
        onSubmit={handleAdd}
      >

        <input
          type="text"
          placeholder="What do you need to do?"
          value={input}
          onChange={(event) =>
            setInput(
              event.target.value
            )
          }
        />


        <button
          type="submit"
          className="add-button"
        >
          + Add Todo
        </button>

      </form>


      {/* LIST */}

      {todos.length === 0 ? (

        <div className="todo-empty">

          <h2>
            Your todo list is empty.
          </h2>

          <p>
            Add something you want to accomplish.
          </p>

        </div>

      ) : (

        <div className="todo-list">

          {todos.map(
            (todo) => (

              <div
                className={
                  todo.completed
                    ? "todo-item completed"
                    : "todo-item"
                }
                key={todo._id}
              >


                {/* CHECK */}

                <button
                  type="button"
                  className="todo-check"
                  onClick={() =>
                    handleToggle(
                      todo
                    )
                  }
                >
                  {todo.completed
                    ? "✓"
                    : "○"}
                </button>


                {/* TEXT */}

                {editingId === todo._id ? (

                  <input
                    className="todo-edit-input"
                    value={editingText}
                    onChange={(event) =>
                      setEditingText(
                        event.target.value
                      )
                    }
                    autoFocus
                  />

                ) : (

                  <span className="todo-title">
                    {todo.title}
                  </span>

                )}


                {/* ACTIONS */}

                <div className="todo-actions">

                  {editingId === todo._id ? (

                    <>

                      <button
                        type="button"
                        className="text-button"
                        onClick={() =>
                          saveEdit(
                            todo
                          )
                        }
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        className="text-button"
                        onClick={() => {

                          setEditingId(
                            null
                          );

                          setEditingText("");

                        }}
                      >
                        Cancel
                      </button>

                    </>

                  ) : (

                    <>

                      <button
                        type="button"
                        className="text-button"
                        onClick={() =>
                          startEdit(
                            todo
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="danger-text-button"
                        onClick={() =>
                          handleDelete(
                            todo
                          )
                        }
                      >
                        Delete
                      </button>

                    </>

                  )}

                </div>

              </div>

            )
          )}

        </div>

      )}

    </section>

  );

}


export default TodoList;
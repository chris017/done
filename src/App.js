import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useForm } from "react-hook-form";
import React from "react";
import useFetch from "react-fetch-hook";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  function onSubmit(data) {
    fetch("http://127.0.0.1:8080/api/todo/?name=" + data.toDo,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
      })
      .then(function (res) { window.location.reload(); })
      .catch(function (res) { console.log(res); });
  }

  function deleteTodo(id) {
    fetch(`http://127.0.0.1:8080/api/todo/${id}`,
      {
        method: "DELETE",
      })
      .then(function (res) { window.location.reload(); })
      .catch(function (res) { console.log(res); });
  }

  const { isLoading, data } = useFetch("http://127.0.0.1:8080/api/alltodos/");
  if (isLoading) {
    return <div>Is loading!</div>
  }

  const todos = data;
  return (
    <main>
      <div class="flex-column flex-shrink-0 p-3 float-start sideBar">
        <a><span class="fs-4">DONE</span></a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a class="nav-link active myBtn" aria-current="page">
              <svg class="bi pe-none me-2" width="16" height="16">
              </svg>
              Todo's
            </a>
          </li>
        </ul>
        <hr />
      </div>

      <div class="form-container">
        <form name="todoForm" onSubmit={handleSubmit(onSubmit)}>
          <div class="list-group toDo">
            {todos.map(todos => <label class="list-group-item d-flex gap-3 toDo">
              <span class="pt-1 form-checked-content toDo">
                <strong>{todos.name}</strong>
              </span>
              <button onClick={() => deleteTodo(todos.id)} class="btn btn-outline-danger">Delete</button>
            </label>)}
            <label style={{ margin: 10 }}>
              <strong style={{ marginRight: 10 }}>Name:</strong>
              <input {...register("toDo", { required: true })} placeholder="Your ToDo"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
              <button type="submit" class="btn myBtn addBtn">Add</button>
            </label>
          </div>
        </form>
      </div >
    </main >
  );
}

export default App;

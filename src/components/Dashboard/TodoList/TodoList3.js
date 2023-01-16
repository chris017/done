import { useForm } from "react-hook-form";
import useFetch from "react-fetch-hook";
import "./todoLists.css";
import { useAuth0 } from "@auth0/auth0-react";

const ToDoList3 = () => {
  const { user } = useAuth0();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // function to handle the form submission. It makes a POST request to the server to add a new ToDo
  function onSubmit(data) {
    fetch("/api/alltodos?name=" + data.toDo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.toDo,
        type: "month",
        user: user.name, // the user's name is sent with the request
      }),
    })
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (res) {
        console.log(res);
      });
  }

  function deleteTodo(id) {
    fetch(`/api/alltodos/${id}`, {
      method: "DELETE",
    })
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (res) {
        console.log(res);
      });
  }

  function onDone(id, name) {
    fetch(`/api/alltodos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        type: "done",
        user: user.name,
      }),
    })
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (res) {
        console.log(res);
      });
  }

  const { isLoading, data } = useFetch("/api/alltodos");
  if (isLoading) {
    return <div>Is loading!</div>;
  }

  // Filter the todos to only show the ones that are "month" and belong to the current user
  const todosMonth = data.filter(
    (todo) => todo.type === "month" && todo.user === user.name
  );

  return (
    <div class="col-md-4 d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-3">
      <div class="form-container">
        <form name="todoForm" onSubmit={handleSubmit(onSubmit)}>
          <div class="list-group toDo">
            <h2 class="toDoHeading">This Month</h2>
            {todosMonth &&
              todosMonth.map((todosMonth) => (
                <label class="list-group-item d-flex gap-3">
                  <span class="pt-1 form-checked-content">
                    <strong>{todosMonth.name}</strong>
                  </span>
                  <button
                    onClick={() => onDone(todosMonth.id, todosMonth.name)}
                    type="submit"
                    class="btn btn-outline-success"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => deleteTodo(todosMonth.id)}
                    class="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </label>
              ))}
            <label class="toDoLabel">
              <strong class="toDoStrong">Name:</strong>
              <input
                {...register("toDo", { required: true })}
                placeholder="Your ToDo"
                maxLength="13"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
              <button type="submit" class="btn">
                Add
              </button>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ToDoList3;

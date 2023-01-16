import { useForm } from "react-hook-form";
import useFetch from "react-fetch-hook";
import './todoLists.css'
import { useAuth0 } from "@auth0/auth0-react";

const ToDoList2 = () => {
  const { user } = useAuth0();
  const { register, handleSubmit, formState: { errors } } = useForm();
  function onSubmit(data) {
    fetch("/api/alltodos?name=" + data.toDo, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.toDo,
        type: "week" + user.name
      })
    })
      .then(function (res) { window.location.reload(); })
      .catch(function (res) { console.log(res); });
  }

  function deleteTodo(id) {
    fetch(`/api/alltodos/${id}`, {
      method: "DELETE"
    })
      .then(function (res) { window.location.reload(); })
      .catch(function (res) { console.log(res); });
  }


  function onDone(id, name) {
    fetch(`/api/alltodos/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        type: "done"
      })
    })
      .then(function (res) { window.location.reload(); })
      .catch(function (res) { console.log(res); });
  }

  const { isLoading, data } = useFetch("/api/alltodos");
  if (isLoading) {
    return <div>Is loading!</div>
  }

  const todosWeek = data.filter(todo => todo.type === "week" + user.name);
  return (
    <div class="col-md-4 d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-3">
      <div class="form-container">
        <form name="todoForm" onSubmit={handleSubmit(onSubmit)}>
          <div class="list-group toDo">
            <h2 class="toDoHeading">This Week</h2>
            {todosWeek && todosWeek.map(todosWeek => <label class="list-group-item d-flex gap-3">
              <span class="pt-1 form-checked-content">
                <strong>{todosWeek.name}</strong>
              </span>
              <button onClick={() => onDone(todosWeek.id, todosWeek.name)} type="submit" class="btn btn-outline-success">Done</button>
              <button onClick={() => deleteTodo(todosWeek.id)} class="btn btn-outline-danger">Delete</button>
            </label>)}
            <label class="toDoLabel">
              <strong class="toDoStrong">Name:</strong>
              <input {...register("toDo", { required: true })} placeholder="Your ToDo" maxLength="13"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
              <button type="submit" class="btn">Add</button>
            </label>
          </div>
        </form>
      </div >
    </div>
  );
}

export default ToDoList2;

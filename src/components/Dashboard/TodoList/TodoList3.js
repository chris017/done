import { useForm } from "react-hook-form";
import useFetch from "react-fetch-hook";
import './todoLists.css'

const ToDoList3 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  function onSubmit(data) {
    fetch("/api/doMonth/?name=" + data.toDo,
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
    fetch(`/api/doMonth/${id}`,
      {
        method: "DELETE",
      })
      .then(function (res) { window.location.reload(); })
      .catch(function (res) { console.log(res); });
  }

  function onDone(data) {
    fetch("/api/doDone/?name=" + data,
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

  const { isLoading, data } = useFetch("/api/doMonth/");
  if (isLoading) {
    return <div>Is loading!</div>
  }

  const todosMonth = data;
  return (
    <div class="col-md-4 d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-3">
      <div class="form-container">
        <form name="todoForm" onSubmit={handleSubmit(onSubmit)}>
          <div class="list-group toDo">
            <h2 class="toDoHeading">This Month</h2>
            {todosMonth && todosMonth.map(todosMonth => <label class="list-group-item d-flex gap-3">
              <span class="pt-1 form-checked-content">
                <strong>{todosMonth.name}</strong>
              </span>
              <button onClick={() => { onDone(todosMonth.name); deleteTodo(todosMonth.id) }} type="submit" class="btn btn-outline-success">Done</button>
              <button onClick={() => deleteTodo(todosMonth.id)} class="btn btn-outline-danger">Delete</button>
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

export default ToDoList3;

import { useForm } from "react-hook-form";
import useFetch from "react-fetch-hook";
import './todoLists.css'

const ToDoList2 = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
  function onSubmit(data) {
    fetch("http://127.0.0.1:8080/api/doWeek/?name=" + data.toDo,
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
    fetch(`http://127.0.0.1:8080/api/doWeek/${id}`,
      {
        method: "DELETE",
      })
      .then(function (res) { window.location.reload(); })
      .catch(function (res) { console.log(res); });
  }

  function onDone(data) {
    fetch("http://127.0.0.1:8080/api/doDone/?name=" + data,
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

  const { isLoading, data } = useFetch("http://127.0.0.1:8080/api/doWeek/");
  if (isLoading) {
    return <div>Is loading!</div>
  }

  const todosWeek = data;
    return (
        <div class="col-md-4 d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-3">
          <div class="form-container">
          <form name="todoForm" onSubmit={handleSubmit(onSubmit)}>
            <div class="list-group toDo">
              <h2 class="toDoHeading">This Week</h2>
              {todosWeek.map(todosWeek => <label class="list-group-item d-flex gap-3">
                <span class="pt-1 form-checked-content">
                  <strong>{todosWeek.name}</strong>
                </span>
                <button onClick={() => {onDone(todosWeek.name); deleteTodo(todosWeek.id)}} type="submit" class="btn btn-outline-success">Done</button>
                <button onClick={() => deleteTodo(todosWeek.id)} class="btn btn-outline-danger">Delete</button>
              </label>)}
              <label class="toDoLabel">
                <strong class="toDoStrong">Name:</strong>
                <input {...register("toDo", { required: true })} placeholder="Your ToDo" maxlength="13"
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

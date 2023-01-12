import { useForm } from "react-hook-form";
import useFetch from "react-fetch-hook";

const ToDoList1 = () => {
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
        <div class="float-start d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
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
      </div>
    );
}

export default ToDoList1;

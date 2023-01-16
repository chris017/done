import useFetch from "react-fetch-hook";
import "./todoLists.css";
import { useAuth0 } from "@auth0/auth0-react";

const TodoDoneList = () => {
  // Get the user object from the Auth0 context
  const { user } = useAuth0();
  // Function to handle the deletion of a todo item
  function deleteTodo(id) {
    // Make a DELETE request to the backend to delete the todo item
    fetch(`api/alltodos/${id}`, {
      method: "DELETE",
    })
      .then(function (res) {
        // Reload the page after successful deletion
        window.location.reload();
      })
      .catch(function (res) {
        console.log(res);
      });
  }

  // Fetch the data from the backend
  const { isLoading, data } = useFetch("/api/alltodos");

  // If the data is still loading, show a loading message
  if (isLoading) {
    return <div>Is loading!</div>;
  }

  // Filter the todos to only show the ones that are "done" and belong to the current user
  const doDone = data.filter(
    (todo) => todo.type === "done" && todo.user === user.name
  );
  // Render the completed todo list

  return (
    <div class="col-md-4 d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-3">
      <div class="form-container">
        <form name="todoForm" class="toDoDone">
          <div class="list-group toDo">
            <h2 class="toDoHeading">Completed Tasks</h2>
            {doDone &&
              doDone.map((doDone) => (
                <label class="list-group-item d-flex gap-3">
                  <span class="pt-1 form-checked-content">
                    <strong>{doDone.name}</strong>
                  </span>
                  <button
                    onClick={() => deleteTodo(doDone.id)}
                    class="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </label>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoDoneList;

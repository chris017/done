import { useState } from "react";
import useFetch from "react-fetch-hook";
import "./searchTodos.css";
import { useAuth0 } from "@auth0/auth0-react";

const SearchMenu = () => {
  const { user } = useAuth0();
  const [searchTerm, setSearchTerm] = useState(""); // Initialize state to keep track of the search term entered by the user

  function handleSearchChange(e) {
    setSearchTerm(e.target.value); // Update the search term state when the user types in the input field
  }

  const { isLoading, data } = useFetch("/api/alltodos"); // Fetch all todos from the API

  if (isLoading) {
    return <div>Is loading!</div>;
  }

  const filteredTodos = data.filter(
    (
      todo // Filter out the todos that match the search term entered by the user
    ) =>
      (todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      todo.user === user.name
  );

  return (
    <div class="searchField">
      <input
        type="text"
        placeholder="Search Todos"
        onChange={handleSearchChange} // Call the handleSearchChange function when the input field value changes
      />
      <div className="search-result">
        {filteredTodos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMenu;

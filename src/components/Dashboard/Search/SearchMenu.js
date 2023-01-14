import { useState } from 'react';
import useFetch from "react-fetch-hook";
const { useAuth0 } = require("@auth0/auth0-react");

const SearchMenu = () => {
    const { user } = useAuth0();
    const [searchTerm, setSearchTerm] = useState('');

    function handleSearchChange(e) {
        setSearchTerm(e.target.value);
    }

    const { isLoading, data } = useFetch("/api/alltodos");
    if (isLoading) {
        return <div>Is loading!</div>
    }



    const filteredTodos = data.filter(todo =>
        todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input type="text" placeholder="Search Todos" onChange={handleSearchChange} />
            <div className="search-result">
                {filteredTodos.map((todo) => (
                    <div key={todo.id}>
                        <p>{todo.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchMenu;
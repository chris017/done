import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import SearchField from './components/Dashboard/Search/SearchMenu';
import SideMenu from './components/Dashboard/SideMenu/SideMenu';
import TodoDoneList from './components/Dashboard/TodoList/TodoDoneList';
import ToDoList1 from './components/Dashboard/TodoList/TodoList1';
import ToDoList2 from './components/Dashboard/TodoList/TodoList2';
import ToDoList3 from './components/Dashboard/TodoList/TodoList3';
import LoginButton from './components/Dashboard/Login/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import SearchMenu from './components/Dashboard/Search/SearchMenu';

function App() {

  const { isLoading, error } = useAuth0();
  const { isAuthenticated } = useAuth0();

  return (
    <div class="container-fluid">
      {isAuthenticated &&
        <div class="row">
          <SideMenu></SideMenu>
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-5">
            <div class="row">
              <ToDoList1></ToDoList1>
              <ToDoList2></ToDoList2>
              <ToDoList3></ToDoList3>
              <TodoDoneList></TodoDoneList>
              <SearchMenu></SearchMenu>
            </div>
          </main>
        </div>
      }
      <div>
        {!isAuthenticated && <h1>DONE</h1>}
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            <LoginButton />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

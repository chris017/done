import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import SideMenu from './components/Dashboard/SideMenu/SideMenu';
import ToDoList1 from './components/Dashboard/TodoList/TodoList1';
import ToDoList2 from './components/Dashboard/TodoList/TodoList2';

function App() {
  return (
    <div class="container-fluid">
      <div class="row">
        <SideMenu></SideMenu>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <ToDoList1></ToDoList1>
          <ToDoList2></ToDoList2>
        </main>
      </div>
    </div>
    );
}

export default App;

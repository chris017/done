const express = require("express");
const app = express();
const path = require("path");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // If needed
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  ); // If needed
  res.setHeader("Access-Control-Allow-Credentials", true); // If needed
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

const bodyParser = require("body-parser");
const { default: userEvent } = require("@testing-library/user-event");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let allTodos = [];

app.get("/api/alltodos", (req, res) => {
  if (req.query.type) {
    res.json(allTodos.filter((todo) => todo.type === req.query.type));
  } else {
    res.json(allTodos);
  }
});

app.get("/api/alltodos?type=all", (req, res) => {
  res.json(allTodos);
});

app.delete("/api/alltodos/:todoId", (req, res) => {
  // Find the index of the todo with the matching id
  const todoIndex = allTodos.findIndex((todo) => todo.id === req.params.todoId);

  // If no todo was found, return a 404 response
  if (todoIndex === -1) {
    res.sendStatus(404);
    return;
  }

  // Otherwise, remove the todo from the array and return a 200 response
  allTodos.splice(todoIndex, 1);
  res.sendStatus(200);
});

app.post("/api/alltodos", (req, res) => {
  const { name, type } = req.body;
  const id = Math.random().toString(36).substr(2, 9);

  allTodos.push({ id, name, type, user: req.body.user });
  res.sendStatus(200);
});

app.put("/api/alltodos/:todoId", (req, res) => {
  const todoIndex = allTodos.findIndex((todo) => todo.id === req.params.todoId);
  if (todoIndex === -1) {
    res.sendStatus(404);
    return;
  }
  allTodos[todoIndex].type = "done";
  res.sendStatus(200);
});

app.get("/api/search", (req, res) => {
  const searchInput = req.query.name;
  const foundTodos = allTodos.filter((todo) =>
    todo.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  if (foundTodos.length > 0) {
    res.json(foundTodos);
  } else {
    res.sendStatus(404);
  }
});

module.exports = app;

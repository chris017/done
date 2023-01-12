const express = require('express');
const app = express();
const path = require('path');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

let alltodos = [
    { id: "1", name: "Example Todo" }
]

app.post("/api/todo", (req, res) => {
    const id = Math.random().toString(36).substr(2, 9);

    // Add the new todo item to the array
    alltodos.push({ id: id, name: req.query.name });
    res.sendStatus(200);
})
app.get('/api/alltodos', (req, res) => res.json(alltodos));
app.get('/api/todo/:todoId', (req, res) => {
    const matchingTodos = alltodos.filter(a => a.id === req.params.todoId);
    if (matchingTodos.length <= 0) {
        res.sendStatus(404);
    }
    res.json(matchingTodos[0])
});


app.delete('/api/todo/:todoId', (req, res) => {
    // Find the index of the todo with the matching id
    const todoIndex = alltodos.findIndex(a => a.id === req.params.todoId);

    // If no todo was found, return a 404 response
    if (todoIndex === -1) {
        res.sendStatus(404);
        return;
    }

    // Otherwise, remove the todo from the array and return a 200 response
    alltodos.splice(todoIndex, 1);
    res.sendStatus(200);
});

//Do Today Todos added API call

let doToday = []

app.post("/api/doToday", (req, res) => {
    const id = Math.random().toString(36).substr(2, 9);

    // Add the new todo item to the array
    doToday.push({ id: id, name: req.query.name });
    res.sendStatus(200);
})

app.get("/api/doToday", (req, res) => {
    res.json(doToday);
});

app.delete("/api/doToday/:todoId", (req, res) => {
    // Find the index of the todo with the matching id
    const todoIndex = doToday.findIndex(a => a.id === req.params.todoId);

    // If no todo was found, return a 404 response
    if (todoIndex === -1) {
        res.sendStatus(404);
        return;
    }

    // Otherwise, remove the todo from the array and return a 200 response
    doToday.splice(todoIndex, 1);
    res.sendStatus(200);
});


// Add do This Week

let doWeek = []

app.post("/api/doWeek", (req, res) => {
    const id = Math.random().toString(36).substr(2, 9);

    // Add the new todo item to the array
    doWeek.push({ id: id, name: req.query.name });
    res.sendStatus(200);
})

app.get("/api/doWeek", (req, res) => {
    res.json(doWeek);
});

app.delete("/api/doWeek/:todoId", (req, res) => {
    // Find the index of the todo with the matching id
    const todoIndex = doWeek.findIndex(a => a.id === req.params.todoId);

    // If no todo was found, return a 404 response
    if (todoIndex === -1) {
        res.sendStatus(404);
        return;
    }

    // Otherwise, remove the todo from the array and return a 200 response
    doWeek.splice(todoIndex, 1);
    res.sendStatus(200);
});

// Add do This Month

let doMonth = []

app.post("/api/doMonth", (req, res) => {
    const id = Math.random().toString(36).substr(2, 9);

    // Add the new todo item to the array
    doMonth.push({ id: id, name: req.query.name });
    res.sendStatus(200);
})

app.get("/api/doMonth", (req, res) => {
    res.json(doMonth);
});

app.delete("/api/doMonth/:todoId", (req, res) => {
    // Find the index of the todo with the matching id
    const todoIndex = doMonth.findIndex(a => a.id === req.params.todoId);

    // If no todo was found, return a 404 response
    if (todoIndex === -1) {
        res.sendStatus(404);
        return;
    }

    // Otherwise, remove the todo from the array and return a 200 response
    doWeek.splice(todoIndex, 1);
    res.sendStatus(200);
});

module.exports = app;
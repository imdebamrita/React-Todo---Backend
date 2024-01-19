const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// midileware
app.use(cors());
app.use(express.json());
// ROUTES

// create a todo
app.post("/todos/create", async (req, res) => {
    try {
        const { description, category, completed } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description, category, completed) VALUES($1, $2, $3) RETURNING *",
            [description, category, completed])

        res.json(newTodo.rows[0]);
    }
    catch (error) {
        console.log(error.message);
    }
})

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todo ORDER BY completed ASC, created_at DESC;");

        res.json(todos.rows)
    }
    catch (error) {
        console.log(error.message);

    }
})

// get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        // console.log(req.params)
        const id = req.params.id;
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);

        res.json(todo.rows)
    }
    catch (error) {
        console.log(error.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        // console.log(req.params)
        const id = req.params.id;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [description, id]);

        res.json("Todo Updated")
    }
    catch (error) {
        console.log(error.message);
    }
})

// update a todo - Toggle complete state
app.put("/todos/toggleComplete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateTodo = await pool.query("UPDATE todo SET completed = CASE WHEN completed = true THEN false ELSE true END WHERE id = $1", [id]);

        res.json("Complete state toggled");
    }
    catch (error) {
        console.log(error.message);
    }
})

// delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);

        res.json("Todo is deleted!");
    }
    catch (error) {
        console.log(error);
    }

})


app.listen(5000, () => {
    console.log("Server has started on port 5000");
})
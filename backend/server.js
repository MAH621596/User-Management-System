const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',      // XAMPP default empty
    database: 'TMS'    // EXACT database name
});

db.connect(err => {
    if(err) console.log("DB Error:", err);
    else console.log("MySQL Connected");
});


// --------- CRUD APIs ---------

// GET all users
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if(err) return res.status(500).send(err);
        res.json(result);
    });
});

// GET user by id
app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
        if(err) return res.status(500).send(err);
        if(result.length === 0) return res.status(404).send("User not found");
        res.json(result[0]);
    });
});

// CREATE new user
app.post("/users", (req, res) => {
    const { name, email, age } = req.body;
    db.query("INSERT INTO users (name, email, age) VALUES (?, ?, ?)", 
        [name, email, age], (err, result) => {
            if(err) return res.status(500).send(err);
            res.json({ id: result.insertId, name, email, age });
        }
    );
});

// UPDATE user by id
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    db.query(
        "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?", 
        [name, email, age, id],
        (err, result) => {
            if(err) return res.status(500).send(err);
            if(result.affectedRows === 0) return res.status(404).send("User not found");
            res.json({ id, name, email, age });
        }
    );
});

// DELETE user by id
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if(err) return res.status(500).send(err);
        if(result.affectedRows === 0) return res.status(404).send("User not found");
        res.send("User deleted successfully");
    });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000."));

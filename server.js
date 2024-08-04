const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const auth = require('./auth');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/auth', auth);

// Middleware to check authentication
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.userId = decoded.id;
        next();
    });
};

// Get projects
app.get('/projects', authenticate, (req, res) => {
    db.all("SELECT * FROM projects WHERE user_id = ?", [req.userId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Create project
app.post('/projects', authenticate, (req, res) => {
    const { name } = req.body;
    db.run("INSERT INTO projects (name, user_id) VALUES (?, ?)", [name, req.userId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get tasks
app.get('/tasks', authenticate, (req, res) => {
    db.all("SELECT * FROM tasks WHERE user_id = ?", [req.userId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Create task
app.post('/tasks', authenticate, (req, res) => {
    const { title, description, project_id } = req.body;
    db.run("INSERT INTO tasks (title, description, project_id, user_id) VALUES (?, ?, ?, ?)", [title, description, project_id, req.userId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Create comment
app.post('/comments', authenticate, (req, res) => {
    const { content, task_id } = req.body;
    db.run("INSERT INTO comments (content, task_id, user_id) VALUES (?, ?, ?)", [content, task_id, req.userId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

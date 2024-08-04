const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('project_management.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, name TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT, description TEXT, project_id INTEGER, FOREIGN KEY(project_id) REFERENCES projects(id))");
    db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, content TEXT, task_id INTEGER, FOREIGN KEY(task_id) REFERENCES tasks(id))");
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT)");
});

module.exports = db;

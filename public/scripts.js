document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('project-list')) {
        fetch('/projects')
            .then(response => response.json())
            .then(projects => {
                const projectList = document.getElementById('project-list');
                projects.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.innerHTML = `<h3>${project.name}</h3>`;
                    projectList.appendChild(projectDiv);
                });
            });

        document.getElementById('new-project-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const projectName = document.getElementById('project-name').value;
            fetch('/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: projectName })
            });
            document.getElementById('project-name').value = '';
        });
    }

    if (document.getElementById('task-list')) {
        fetch('/tasks')
            .then(response => response.json())
            .then(tasks => {
                const taskList = document.getElementById('task-list');
                tasks.forEach(task => {
                    const taskDiv = document.createElement('div');
                    taskDiv.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p>`;
                    taskList.appendChild(taskDiv);
                });

                fetch('/projects')
                    .then(response => response.json())
                    .then(projects => {
                        const projectSelect = document.getElementById('project-select');
                        projects.forEach(project => {
                            const option = document.createElement('option');
                            option.value = project.id;
                            option.textContent = project.name;
                            projectSelect.appendChild(option);
                        });
                    });

                document.getElementById('new-task-form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    const taskTitle = document.getElementById('task-title').value;
                    const taskDescription = document.getElementById('task-description').value;
                    const projectId = document.getElementById('project-select').value;
                    fetch('/tasks', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title: taskTitle, description: taskDescription, project_id: projectId })
                    });
                    document.getElementById('task-title').value = '';
                    document.getElementById('task-description').value = '';
                });
            });
            // Handle user registration
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'login.html';
                } else {
                    alert(data.message);
                }
            });
        });
    }
    // Handle user login    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'index.html';
                } else {
                    alert(data.message);
                }
            });
        });
    }
});

    }
});

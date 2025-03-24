let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const name = document.getElementById('taskName').value.trim();
    const description = document.getElementById('taskDesc').value.trim();
    if (!name) return;
    tasks.push({ id: Date.now(), name, description, status: 'pending' });
    saveTasks();
    renderTasks();
    document.getElementById('taskName').value = '';
    document.getElementById('taskDesc').value = '';
}

function renderTasks() {
    const filter = document.getElementById('filter').value;
    document.getElementById('taskList').innerHTML = tasks.filter(task => filter === 'all' || task.status === filter)
        .map(task => `<div class='task ${task.status}'>
            <div><strong>${task.name}</strong></div>
            <div>${task.description || 'No description'}</div>
            <div>
                <button onclick="toggleStatus(${task.id})">${task.status === 'completed' ? 'Undo' : 'Done'}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>`).join('');
}

function toggleStatus(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task);
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        const newName = prompt("Edit Task Name:", task.name);
        const newDesc = prompt("Edit Task Description:", task.description);
        if (newName !== null) task.name = newName;
        if (newDesc !== null) task.description = newDesc;
        saveTasks();
        renderTasks();
    }
}

renderTasks();

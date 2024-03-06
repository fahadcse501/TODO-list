// Function to create a new task element
function createTaskElement(task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'flex items-center justify-between border-b-2 border-gray-700 py-2';

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = task.text;
    taskTextElement.className = task.completed ? 'text-lg line-through text-gray-300 cursor-pointer' : 'text-lg text-white cursor-pointer';
    taskTextElement.addEventListener('dblclick', function () {
        editTask(task, taskTextElement);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.className = 'text-red-500';
    deleteButton.addEventListener('click', function () {
        deleteTask(task.id);
    });

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(deleteButton);

    return taskItem;
}

// Function to fetch tasks from localStorage
function fetchTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks on the page
function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = createTaskElement(task);
        taskList.appendChild(taskItem);
    });
}

// Function to add a new task
function addTask(taskText) {
    const tasks = fetchTasks();
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks(tasks);
}

// Function to delete a task
function deleteTask(taskId) {
    const tasks = fetchTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
    renderTasks(updatedTasks);
}

// Function to edit a task
function editTask(taskToEdit, taskTextElement) {
    const newText = prompt('Edit task:', taskToEdit.text);
    if (newText !== null) {
        const tasks = fetchTasks();
        const updatedTasks = tasks.map(task => {
            if (task.id === taskToEdit.id) {
                task.text = newText;
            }
            return task;
        });
        saveTasks(updatedTasks);
        taskTextElement.textContent = newText;
    }
}

// Function to handle adding a task when button is clicked
document.getElementById('addTaskBtn').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
});

// Initial rendering of tasks on page load
renderTasks(fetchTasks());

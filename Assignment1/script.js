//To-Do List Web App

const taskInput = document.getElementById('taskInput'); 
const addButton = document.getElementById('addButton'); 
const taskList = document.getElementById('taskList'); 

//array to store all our tasks
let tasks = [];

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

//Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    // Check if the input is empty (validation)
    if (taskText === '') {
        alert('Please enter a task!'); 
        return; 
    }
    

    const newTask = {
        id: Date.now(), 
        text: taskText, 
        completed: false 
    };
     tasks.push(newTask);
    
    taskInput.value = '';
    
    displayTasks();
}
function displayTasks() {
    taskList.innerHTML = '';
    

    tasks.forEach(function(task) {
        const listItem = document.createElement('li');

        if (task.completed) {
            listItem.className = 'task-item completed';
        } else {
            listItem.className = 'task-item';
        }
        
        listItem.innerHTML = `
            <div class="task-content">
                <input 
                    type="checkbox" 
                    ${task.completed ? 'checked' : ''} 
                    onchange="toggleTask(${task.id})"
                >
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        taskList.appendChild(listItem);
    });
}

function toggleTask(taskId) {

    const task = tasks.find(function(task) {
        return task.id === taskId;
    });
    if (task) {
        task.completed = !task.completed; 
    }
    displayTasks();
}
function deleteTask(taskId) {
    // Remove the task from our tasks array
    tasks = tasks.filter(function(task) {
        return task.id !== taskId; 
    });
    displayTasks();
}

displayTasks(); 

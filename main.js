// My Tasks Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let tasksEl = document.getElementById('tasks');

// Global Variables
let tasks = loadTasks();
displayAll()

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'add') {
    addTask();
  } else if (selection === 'toggle') {
    toggleTask();
  } else if (selection === 'remove') {
    removeTask();
  } else if (selection === 'clear') {
    clearAll();
  }
}

// MENU FUNCTIONS
function addTask() {
  let description = prompt ("enter task description")
  tasks.push(newTask(description));
  tasksEl.innerHTML = `Task Added: ${description}`;
  saveTasks();
  displayAll();
}

// Toggle completed status of a task
function toggleTask() {
  let index = +prompt('Enter task description:')
  let task = tasks[index]
  if 
  (task.completed === '') {
    task.completed = 'completed';
  } else {
    task.completed = ''
  }
  saveTasks()
  displayAll()
}

// Remove a task by index
function removeTask() {
  let index = +prompt('Enter # of task:');
  if (index >= 0 && index < tasks.length) {
    // Valid Index --> remove
    tasks.splice (index, 1);
    saveTasks();
    displayAll();
  } else {
    alert('Invalid Task #');
  }
}

// Clear all tasks
function clearAll() {
  tasks = [];
  saveTasks();
  displayAll();
}

// helper functions
// Return a new task object
function newTask (taskDescription) {
  return {
    description: taskDescription,
    completed: ''
  };

}

// Display all tasks in global array
function displayAll() {
  let outputStr = '' ;
  for(let i = 0; i < tasks.length; i++) {
    outputStr += getTaskHtmlStr(tasks[i], i);
  }
  tasksEl.innerHTML = outputStr;
}

// Get html for given task
function getTaskHtmlStr(task, i) {
  return `
    <div class="${task.completed}">
     ${i}: ${task.description}
   </div>
    `
}

// Save Global Tasks to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
  let taskStr = localStorage.getItem('tasks');
  return JSON.parse(taskStr) ?? [];
}
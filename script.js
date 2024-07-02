// Elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Event Listeners
addTaskButton.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", loadTasks);

// Functions
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    return;
  }

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  saveTask(taskText);

  taskInput.value = "";
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className = "tasks";
  li.addEventListener("click", taskComplete);
  li.textContent = taskText;

  const deleteTask = document.createElement("span");
  deleteTask.className = "delete-task";
  deleteTask.textContent = "X";
  deleteTask.addEventListener("click", taskDelete);

  li.appendChild(deleteTask);
  return li;
}

function taskComplete(event) {
  if (event.target.classList.contains("delete-task")) {
    return;
  }
  const taskItem = event.currentTarget;
  taskItem.classList.toggle("completed");
}

function taskDelete(event) {
  event.stopPropagation();
  const taskItem = event.target.parentElement;
  taskList.removeChild(taskItem);

  deleteTaskFromStorage(taskItem.textContent.slice(0, -1));
}

function saveTask(taskText) {
  let tasks = getTasksFromStorage();
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

function deleteTaskFromStorage(taskText) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = getTasksFromStorage();
  tasks.forEach((taskText) => {
    const li = createTaskElement(taskText);
    taskList.appendChild(li);
  });
}

const entryTask = document.getElementById("entryTask");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = entryTask.value;
    if (taskText === "") {
        return;
    }

    const li = document.createElement("li");
    li.className = "tasks";
    li.addEventListener('click', toggleTaskCompletion);

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "X";
    deleteButton.addEventListener('click', deleteTask);

    li.appendChild(taskContent);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    entryTask.value = ""; // Giriş kutusunu temizle
}

function deleteTask(event) {
    event.stopPropagation(); // Delete butonuna tıklanınca üst öğenin tıklanmasını engeller
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
}

function toggleTaskCompletion(event) {
    if (event.target.classList.contains('delete')) {
        return;
    }
    const taskItem = event.currentTarget;
    taskItem.classList.toggle("completed");
}

document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', deleteTask);
});


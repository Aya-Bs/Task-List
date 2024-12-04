const taskInput = document.querySelector("#newtask input");
const taskSection = document.querySelector('.tasks');
taskInput.addEventListener("keyup",(e)=>{
    if(e.key=="Enter"){createTask();}
});
document.querySelector('#push').onclick=function(){
    createTask();
}
function createTask() {
    // Check if the input is empty
    if (taskInput.value.trim().length === 0) {
        alert("Please enter a task");
        return; // Stop further execution
    }


    // Ensure no duplicate tasks
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (tasks.includes(taskInput.value.trim())) {
        alert("Task already exists!");
        return; // Stop further execution
    }

    // Add the task to the task list
    tasks.push(taskInput.value.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks to localStorage

    // Display the task
    displayTasks();

    // Clear the input field
    taskInput.value = "";
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskSection.innerHTML = ""; // Clear current task display

    tasks.forEach((task) => {
        taskSection.innerHTML += `
        <div class="task">
            <label id="taskname">
                <input onclick="updateTask(this)" type="checkbox" id="check-task" />
                <p>${task}</p>
            </label>
            <div class="delete">
                <i class="uil uil-trash"></i>
            </div>
        </div>`;
    });

    // Add delete functionality to tasks
    const currentTasks = document.querySelectorAll(".delete");
    currentTasks.forEach((btn, index) => {
        btn.onclick = function () {
            deleteTask(index); // Delete the task by index
        };
    });
    taskSection.offsetHeight >= 300
        ? taskSection.classList.add("overflow")
        : taskSection.classList.remove("overflow");
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1); // Remove the task from the array
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks to localStorage
    displayTasks(); // Refresh the displayed tasks
}

function updateTask(task) {
    let taskItem = task.parentElement.lastElementChild;
    if (task.checked) {
        taskItem.classList.add("checked");
    } else {
        taskItem.classList.remove("checked");
    }
}

// Load tasks on page load
window.onload = displayTasks;
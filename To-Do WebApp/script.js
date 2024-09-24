// Get references to elements
const newTaskInput = document.getElementById('new-task');
const taskDescInput = document.getElementById('task-desc');
const addTaskBtn = document.getElementById('add-task-btn');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');

// Event listener for adding new task
addTaskBtn.addEventListener('click', addTask);

// Function to add a task to the pending list
function addTask() {
    const taskName = newTaskInput.value.trim();
    const taskDesc = taskDescInput.value.trim();

    if (taskName === '' || taskDesc === '') {
        alert('Please enter both a task name and description!');
        return;
    }

    // Create task item
    const taskItem = createTaskElement(taskName, taskDesc);

    // Add the task to pending list
    pendingTasksList.appendChild(taskItem);

    // Clear input fields
    newTaskInput.value = '';
    taskDescInput.value = '';
}

// Function to create task item element with name and description
function createTaskElement(taskName, taskDesc) {
    const li = document.createElement('li');

    // Task Details (Name and Description)
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';

    const taskNameSpan = document.createElement('span');
    taskNameSpan.className = 'task-name';
    taskNameSpan.textContent = taskName;
    
    const taskDescSpan = document.createElement('span');
    taskDescSpan.className = 'task-desc';
    taskDescSpan.textContent = taskDesc;

    taskDetails.appendChild(taskNameSpan);
    taskDetails.appendChild(taskDescSpan);
    li.appendChild(taskDetails);

    // Task actions: Edit, Complete, Delete
    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.onclick = function() { editTask(taskNameSpan, taskDescSpan) };
    taskActions.appendChild(editBtn);

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = 'Complete';
    completeBtn.onclick = function() { completeTask(li) };
    taskActions.appendChild(completeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() { deleteTask(li) };
    taskActions.appendChild(deleteBtn);

    li.appendChild(taskActions);

    return li;
}

// Function to complete a task
function completeTask(taskItem) {
    taskItem.querySelector('.complete-btn').remove(); // Remove the "Complete" button
    completedTasksList.appendChild(taskItem);
}

// Function to delete a task
function deleteTask(taskItem) {
    taskItem.remove();
}

// Function to edit a task
function editTask(taskNameElement, taskDescElement) {
    const newTaskName = prompt('Edit the task name', taskNameElement.textContent);
    const newTaskDesc = prompt('Edit the task description', taskDescElement.textContent);
    
    if (newTaskName !== null && newTaskDesc !== null) {
        taskNameElement.textContent = newTaskName.trim();
        taskDescElement.textContent = newTaskDesc.trim();
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("create-task-form");
  const taskInput = document.getElementById("new-task-description");
  const taskList = document.getElementById("tasks");
  const dueDateInput = document.getElementById("due-date");
  const userInput = document.getElementById("user");
  const priorityDropdown = document.getElementById("task-priority");

  if (!taskForm || !taskInput || !taskList || !priorityDropdown) {
    console.error("One or more elements are missing from the DOM.");
    return;
  }

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents page refresh

    // Get user input values
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const assignedUser = userInput.value.trim();
    const priority = priorityDropdown.value;

    if (taskText === "") {
      alert("Task description cannot be empty!");
      return;
    }

    // Create new list item
    const taskItem = document.createElement("li");
    taskItem.setAttribute("data-priority", priority); // Store priority for sorting
    taskItem.style.color = getPriorityColor(priority);
    taskItem.innerHTML = `
      ${taskText} - Due: ${dueDate || "N/A"} - Assigned to: ${assignedUser || "N/A"}
      <button class="delete-btn">❌</button>
      <button class="edit-btn">✏️</button>
    `;

    // Add event listener to delete button
    taskItem.querySelector(".delete-btn").addEventListener("click", () => {
      taskItem.remove();
    });

    // Add event listener to edit button
    taskItem.querySelector(".edit-btn").addEventListener("click", () => {
      const newTaskText = prompt("Edit Task", taskText);
      if (newTaskText !== null && newTaskText.trim() !== "") {
        taskItem.firstChild.textContent = `${newTaskText} - Due: ${dueDate || "N/A"} - Assigned to: ${assignedUser || "N/A"}`;
      }
    });

    taskList.appendChild(taskItem);
    sortTasks(); // Ensure sorting is maintained

    // Clear input fields
    taskInput.value = "";
    dueDateInput.value = "";
    userInput.value = "";
    priorityDropdown.value = "low";
  });

  // Function to get color based on priority
  function getPriorityColor(priority) {
    switch (priority) {
      case "high": return "red";
      case "medium": return "orange";
      case "low": return "green";
      default: return "black";
    }
  }

  // Function to sort tasks by priority
  function sortTasks() {
    let tasksArray = Array.from(taskList.children);
    tasksArray.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.getAttribute("data-priority")] - priorityOrder[a.getAttribute("data-priority")];
    });

    taskList.innerHTML = ""; // Clear the list
    tasksArray.forEach(task => taskList.appendChild(task)); // Re-add sorted tasks
  }
});
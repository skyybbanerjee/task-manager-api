const taskID = new URLSearchParams(window.location.search).get("id");
const taskEditID = document.querySelector(".task-edit-id");
const taskEditName = document.querySelector(".task-edit-name");
const taskEditCompleted = document.querySelector(".task-edit-completed");
const editForm = document.querySelector(".single-task-form");
const editBtn = document.querySelector(".task-edit-btn");
const formAlert = document.querySelector(".form-alert");
const backLink = document.querySelector(".back-link");
const loadingDOM = document.querySelector(".loading-text");

// Function to fetch and display the task details
const showTask = async () => {
  loadingDOM.style.visibility = "visible"; // Show loading text

  try {
    const response = await axios.get(`/api/v1/tasks/${taskID}`);
    const task = response.data.task;

    if (!task) {
      formAlert.textContent = "Task not found!";
      formAlert.style.display = "block";
      loadingDOM.style.visibility = "hidden";
      return;
    }

    taskEditID.textContent = task._id;
    taskEditName.value = task.name;
    taskEditCompleted.checked = task.completed;
  } catch (error) {
    console.error(error);
    formAlert.textContent = "Error fetching task!";
    formAlert.style.display = "block";
  }

  loadingDOM.style.visibility = "hidden"; // Hide loading text
};

// Function to update the task when the form is submitted
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  editBtn.textContent = "Saving..."; // Indicate saving process

  try {
    const updatedTask = {
      name: taskEditName.value,
      completed: taskEditCompleted.checked,
    };

    await axios.patch(`/api/v1/tasks/update-task/${taskID}`, updatedTask);

    formAlert.textContent = "Task updated successfully!";
    formAlert.classList.add("success");
    formAlert.style.display = "block";
  } catch (error) {
    console.error(error);
    formAlert.textContent = "Error updating task!";
    formAlert.classList.add("error");
    formAlert.style.display = "block";
  }

  editBtn.textContent = "Edit"; // Restore button text
  setTimeout(() => {
    formAlert.style.display = "none";
  }, 3000);
});

// Run the function to fetch and display the task
showTask();

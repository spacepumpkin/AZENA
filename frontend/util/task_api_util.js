/* Task API Util Functions:
  - fetchTask(taskId)   // Probably not using
  * createTask(task)
  * updateTask(task)
  * destroyTask(taskId) 

  - fetchTasks(userId) // fetch all tasks associated with user; no need anymore
*/

// Test Status - 
export const createTask = (task) => {
  console.log(`creating new task (${task.name})...`);
  return $.ajax({
    url: `/api/tasks`,
    method: "POST",
    data: {
      task: {
        name: task.name,
        description: task.description,
        due_date: task.dueDate,
        project_id: task.projectId
      }
    }
  })
}

// Test Status - 
export const updateTask = (task) => {
  console.log(`updating task #${task.id}...`);
  return $.ajax({
    url: `/api/tasks/${task.id}`,
    method: "PATCH",
    data: { task: { name: task.name, description: task.description, due_date: task.dueDate } }
  })
}

// Test Status - 
export const destroyTask = (taskId) => {
  console.log(`destroying task #${taskId}...`);
  return $.ajax({
    url: `/api/tasks/${taskId}`,
    method: "DELETE"
  })
}
/* Task API Util Functions:
  - fetchTask(taskId)   // Probably not using
  * createTask(task)
  * updateTask(task)
  * destroyTask(taskId)
  * assignUsersTask(userId, taskId)
  * unassignUsersTask(userId, taskId)

  - fetchTasks(userId) // fetch all tasks associated with user; no need anymore
*/

// Test Status - PASS
export const createTask = (task) => {
  // console.log(`creating new task ("${task.name}")...`);
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

// Test Status - PASS
// Retest Status (updating only given fields) - PASS
export const updateTask = (task) => {
  // console.log(`updating task #${task.id}...`);
  let updatedTask = {};
  for (let field in task) { 
    updatedTask[field.toSnakeCase()] = task[field];
    // if (field === "dueDate") {
    //   updatedTask["due_date"] = task[field]
    // } else {
    //   updatedTask[field] = task[field] 
    // }
  }

  return $.ajax({
    url: `/api/tasks/${task.id}`,
    method: "PATCH",
    data: { task: updatedTask }
  })
  // return $.ajax({
  //   url: `/api/tasks/${task.id}`,
  //   method: "PATCH",
  //   data: { task: { name: task.name, description: task.description, due_date: task.dueDate, done: task.done } }
  // })
}

// Test Status - PASS
export const destroyTask = (taskId) => {
  // console.log(`destroying task #${taskId}...`);
  return $.ajax({
    url: `/api/tasks/${taskId}`,
    method: "DELETE"
  })
}

// Test Status - PASS
export const assignUsersTask = (userId, taskId) => {
  // console.log(`assigning task #${taskId} to user #${userId}...`);
  return $.ajax({
    url: `/api/users/${userId}/tasks`,
    method: "POST",
    data: { users_task: { user_id: userId, task_id: taskId } }
  })
}

// Test Status - PASS
export const unassignUsersTask = (userId, taskId) => {
  // console.log(`unassigning task #${taskId} from user #${userId}...`);
  return $.ajax({
    url: `/api/users/${userId}/tasks`,
    method: "DELETE",
    data: { users_task: { user_id: userId, task_id: taskId } }
  })
}

String.prototype.toSnakeCase = function() {
  return this.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);

  // Non-Regex Way
  // this.split("").map(char => {
  //   if (char === char.toLowerCase()) {
  //     return char;
  //   } else {
  //     return `_${char.toLowerCase()}`;
  //   }
  // }).join("");
};
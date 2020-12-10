if @users_tasks # After destroying task, so that we can delete assoc users tasks in FE
  json.task do
    json.partial! "api/tasks/task.json.jbuilder", task: @task
  end
  json.users_tasks do
    json.partial! "api/users/users_tasks.json.jbuilder", users_tasks: @users_tasks
  end
elsif @users_task # After creating task, so that we can auto assign user to task in FE
  json.task do
    json.partial! "api/tasks/task.json.jbuilder", task: @task
  end
  json.users_task do
    json.partial! "api/users/users_task.json.jbuilder", users_task: @users_task
  end
else # default: Get just the task back after updating task
  json.partial! "api/tasks/task.json.jbuilder", task: @task
end

json.task do
  json.partial! "api/tasks/task.json.jbuilder", task: @task
end

if @users_tasks
  json.users_tasks do
    json.partial! "api/users/users_tasks.json.jbuilder", users_tasks: @users_tasks
  end
elsif @users_task
  json.users_task do
    json.partial! "api/users/users_task.json.jbuilder", users_task: @users_task
  end
end

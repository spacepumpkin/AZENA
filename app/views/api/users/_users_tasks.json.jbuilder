user.users_tasks.each do |users_task|
  json.set! users_task.id do
    json.partial! "api/users/users_task.json.jbuilder", users_task: users_task
  end
end

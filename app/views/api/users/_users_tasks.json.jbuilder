user.users_tasks.each do |users_task|
  json.set! users_task.id do
    json.extract! users_task, :user_id, :task_id
  end
end

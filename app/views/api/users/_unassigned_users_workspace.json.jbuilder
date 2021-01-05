json.users_workspace do
  json.extract! users_workspace, :id, :user_id, :workspace_id
end

json.users_task_ids users_task_ids
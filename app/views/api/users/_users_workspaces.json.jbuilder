user.users_workspaces.each do |users_workspace|
  json.set! users_workspace.id do
    json.extract! users_workspace, :id, :user_id, :workspace_id
  end
end
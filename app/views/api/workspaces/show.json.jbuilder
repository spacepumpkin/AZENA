
if @users_workspace
  json.workspace do
    json.partial! "api/workspaces/workspace.json.jbuilder", workspace: @workspace
  end

  # Temporary if we refactor Redux usersWorkspaces state to have arrays of workspace ids for each user
  json.users_workspace do
    json.partial! "api/users/users_workspace.json.jbuilder", users_workspace: @users_workspace
  end
else
  json.partial! "api/workspaces/workspace.json.jbuilder", workspace: @workspace
end
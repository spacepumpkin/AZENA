# receives user from either bootstrapping application.html.erb or users#everything

# ! Add member users later
json.users do
  json.partial! "api/users/user.json.jbuilder", user: user
end

json.workspaces do
  json.partial! "api/workspaces/workspaces.json.jbuilder", workspaces: user.workspaces
end

json.projects do
  json.partial! "api/projects/projects.json.jbuilder", projects: user.projects
end

# ! Mainly for when we have member users
json.usersWorkspaces do
  json.partial! "api/users/users_workspaces.json.jbuilder", user: user
end

# ! Mainly for when we have member users
json.usersProjects do
  json.partial! "api/users/users_projects.json.jbuilder", user: user
end

# json.tasks do
#   json.partial! "api/tasks/tasks.json.jbuilder", tasks: user.tasks
# end

# entities: {
#   users: {},
#   workspaces: {},
#   projects: {},
#   usersWorkspaces: {},
#   usersProjects: {},
#   usersTasks: {}
# }

# receives user from either bootstrapping application.html.erb or users#everything

# * For convenience, add key for current user
json.current_user do
  json.partial! "api/users/user.json.jbuilder", user: current_user
end

# ! Add all co-member users later instead of singular user
json.users do
  json.partial! "api/users/users.json.jbuilder", users: [user]
end

json.workspaces do
  json.partial! "api/workspaces/workspaces.json.jbuilder", workspaces: user.workspaces
end

user_projects = user.projects.all.includes(:tasks, :sections)

json.projects do
  json.partial! "api/projects/projects.json.jbuilder", projects: user_projects
end

# ! Possibly replace this with users_tasks if we have multiple users assigned to same tasks
# json.assigned_tasks_ids do
#   # json.partial! "api/tasks/tasks.json.jbuilder", tasks: user.tasks
#   json.array! user.tasks.to_a.map { |task| task.id }
# end

# ! What's a more efficient way? This one turned query # from N+1 to 3, but isn't pretty.
# Alternatively, we could get ALL the tasks then filter in frontend
# This only looks for tasks attached to projects connected to current_user
all_tasks = []
# User.includes(projects: :tasks).find_by(id: user.id).projects.each do |project|
# Project.includes(:tasks).each do |project|
user_projects.each do |project|
  tasks = project.tasks.to_a
  unless tasks.empty?
    all_tasks.concat(tasks)
  end
end

json.tasks do
  json.partial! "api/tasks/tasks.json.jbuilder", tasks: all_tasks
end

# ! Has to be a better way to do this
project_sections = user_projects.inject([]) do |all_sections, project|  
  sections = project.sections.to_a
  all_sections.concat(sections) unless sections.empty?
  all_sections
end

json.sections do
  json.partial! "api/sections/sections.json.jbuilder", sections: project_sections
end

# ! Mainly for when we have member users
json.users_workspaces do
  # json.partial! "api/users/users_workspaces.json.jbuilder", user: user # for current_user only
  UsersWorkspace.all.each do |users_workspace|
    json.set! users_workspace.id do
      json.extract! users_workspace, :user_id, :workspace_id
    end
  end
end

# ! Mainly for when we have member users
json.users_projects do
  # json.partial! "api/users/users_projects.json.jbuilder", user: user # for current_user only
  UsersProject.all.each do |users_project|
    json.set! users_project.id do
      json.extract! users_project, :user_id, :project_id
    end
  end
end

# ! Mainly for when we have member users, multiple assignees for tasks
# json.users_tasks({})
json.users_tasks do
  json.partial! "api/users/users_tasks.json.jbuilder", users_tasks: UsersTask.all
  # UsersTask.all.each do |users_task|
  #   json.set! users_task.id do
  #     json.extract! users_task, :user_id, :task_id
  #   end
  # end
end

# entities: {
#   users: {},
#   workspaces: {},
#   projects: {},
#   tasks: {},
#   usersWorkspaces: {},
#   usersProjects: {},
#   usersTasks: {}
# }

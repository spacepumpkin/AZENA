json.users @users do |user|
  json.set! user.id do 
    json.partial! "api/users/user", user: user
  end
end

# json.workspaces @workspaces do |workspace|
#   json.set! workspace.id do
#     json.partial! "workspace", workspace: workspace
#   end
# end

# entities = {
#   users: {
#     userId: {
#       id: userId,
#       username: username,
#       email: email
#     }
#   },
#   workspaces: {
#     workspaceId: {
#       id: workspaceId,
#       name: workspaceName,
#       description: workspaceDescription,
#       creatorId: creatorId
#     }
#   },
#   projects: {
#     projectId: {
#       id: projectId,
#       name: projectName,
#       workspaceId: project.workspace.id
#       creatorId: project.creator.id
#     }
#   },
#   tasks: {
#     taskId: {
#       id: taskId,
#       name: taskName,
#       description: taskDescription,
#       dueDate: dueDate,
#       priority: priority,
#       status: status,
#       projectId: task.project.id,
#       creatorId: task.creator.id
#     }
#   },
#   usersWorkspaces: {
#     id: {
#       id: id,
#       userId: userId,
#       workspaceId: workspaceId
#     }
#   },
#   usersProjects: {
#     id: {
#       id: id,
#       userId: userId,
#       projectId: projectId
#     }
#   },
#   usersTasks: {
#     id: {
#       id: id,
#       userId: userId,
#       taskId: taskId
#     }
#   }
# }
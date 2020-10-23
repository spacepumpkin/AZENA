user.users_projects.each do |users_project|
  json.set! users_project.id do
    json.extract! users_project, :user_id, :project_id
  end
end
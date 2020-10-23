# @projects.each do |project|
#   json.set! project.id do
#     json.partial! "api/projects/project", project: project
#   end
# end

json.partial! "api/projects/projects.json.jbuilder", projects: @projects
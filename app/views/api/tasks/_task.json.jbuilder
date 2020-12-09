# json.extract! task, :id, :name, :description, :due_date, :project_id, :creator_id #, section_id
json.id task.id
json.name task.name
json.description task.description
json.due_date task.due_date.strftime("%F") unless task.due_date.nil?
json.project_id task.project_id
json.creator_id task.creator_id
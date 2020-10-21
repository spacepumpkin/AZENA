# == Schema Information
#
# Table name: users_workspaces
#
#  id           :bigint           not null, primary key
#  user_id      :bigint
#  workspace_id :bigint
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class UsersWorkspace < ApplicationRecord

  belongs_to :user
  belongs_to :workspace
  
end

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

  validates :user_id, uniqueness: {scope: :workspace_id}

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :workspace,
    foreign_key: :workspace_id,
    class_name: :Workspace

end

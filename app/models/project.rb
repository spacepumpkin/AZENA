# == Schema Information
#
# Table name: projects
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  description  :text
#  workspace_id :integer          not null
#  creator_id   :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Project < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :workspace_id }
  
  # * BUILT-IN ASSOCIATIONS ----------------------------------------

  # Join Table for Users and their Projects on their Workspaces
  has_many :users_projects,
    foreign_key: :project_id,
    class_name: :UsersProject
  
  has_many :users,
    through: :users_projects,
    source: :user
  
  # A Project has 1 creator
  belongs_to :project_creator,
    foreign_key: :creator_id,
    class_name: :User

  # A Project can belong to only 1 workspace
  belongs_to :workspace,
    foreign_key: :workspace_id,
    class_name: :Workspace

  # A Project have 0 or more tasks
  has_many :tasks,
    foreign_key: :project_id,
    class_name: :Task,
    dependent: :destroy

  # * CUSTOM ASSOCIATIONS ----------------------------------------

end

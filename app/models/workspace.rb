# == Schema Information
#
# Table name: workspaces
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :text
#  creator_id  :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Workspace < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :creator_id }

  # * BUILT-IN ASSOCIATIONS ----------------------------------------

  # Join Table for Users that are members of the Workspace
  has_many :users_workspaces,
    foreign_key: :workspace_id,
    class_name: :UsersWorkspace
  
  has_many :users,
    through: :users_workspaces,
    source: :user
  
  # A Workspace has 1 creator
  belongs_to :workspace_creator,
    foreign_key: :creator_id,
    class_name: :User

  
  # A Workspace has 0+ projects
  has_many :projects,
    foreign_key: :workspace_id,
    class_name: :Project,
    dependent: :destroy


  # * CUSTOM ASSOCIATIONS ----------------------------------------

  # All the tasks associated with all the projects under a workspace
  has_many :projects_tasks,
    through: :projects,
    source: :tasks

end

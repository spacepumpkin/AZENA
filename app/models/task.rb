# == Schema Information
#
# Table name: tasks
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :text
#  due_date    :datetime
#  project_id  :integer          not null
#  creator_id  :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  section_id  :integer
#  order       :integer
#  done        :boolean          default(FALSE)
#
class Task < ApplicationRecord

  validates :name, :project_id, :creator_id, presence: true

  # Join Table for Users and their !ASSIGNED Tasks on their Workspaces' Projects
  has_many :users_tasks,
    foreign_key: :task_id,
    class_name: :UsersTask,
    dependent: :destroy # ! necessary?
  
  # ! Attempt to associate tasks through projects
  # For user's assigned tasks
  has_many :assigned_users, # :users,
    through: :users_tasks,
    source: :user
  # Regular tasks (assigned/unassigned) on projects under workspaces assigned to user
  has_many :users,
    through: :project,
    source: :users
  
  # A Task has 1 creator
  belongs_to :task_creator,
    foreign_key: :creator_id,
    class_name: :User

  # A Task can belong to only 1 Project
  belongs_to :project,
    foreign_key: :project_id,
    class_name: :Project

  # A Task can belong to 1 Section (in 1 Project)
  belongs_to :section,
    foreign_key: :section_id,
    class_name: :Section,
    optional: true
end

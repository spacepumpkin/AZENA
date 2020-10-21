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
  
  # Join Table for Users
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

end

# == Schema Information
#
# Table name: users_projects
#
#  id         :bigint           not null, primary key
#  user_id    :integer
#  project_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UsersProject < ApplicationRecord
  validates :user_id, uniqueness: {scope: :project_id}

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :project,
    foreign_key: :project_id,
    class_name: :Project

end

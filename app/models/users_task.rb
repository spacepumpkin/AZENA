# == Schema Information
#
# Table name: users_tasks
#
#  id         :bigint           not null, primary key
#  user_id    :integer
#  task_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UsersTask < ApplicationRecord
  validates :user_id, uniqueness: {scope: :task_id}

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :task,
    foreign_key: :task_id,
    class_name: :Task

end

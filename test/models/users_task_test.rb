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
require 'test_helper'

class UsersTaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

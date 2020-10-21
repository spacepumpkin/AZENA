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
require 'test_helper'

class UsersWorkspaceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

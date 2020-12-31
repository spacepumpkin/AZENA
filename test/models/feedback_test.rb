# == Schema Information
#
# Table name: feedbacks
#
#  id             :bigint           not null, primary key
#  name           :string
#  email          :string
#  improvements   :string
#  other_comments :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
require 'test_helper'

class FeedbackTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

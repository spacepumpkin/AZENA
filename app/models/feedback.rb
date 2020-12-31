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
class Feedback < ApplicationRecord
  validates :improvements, presence: { message: "Please add at least 1 suggested improvement!" }
end

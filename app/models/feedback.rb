class Feedback < ApplicationRecord
  validates :improvements, presence: { message: "Please add at least 1 suggested improvement!" }
end

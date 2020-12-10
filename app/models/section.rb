# == Schema Information
#
# Table name: sections
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  order      :integer          not null
#  project_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Section < ApplicationRecord
  validates :name, :order, :project_id, presence: true

  # A Section can only have 1 Project
  belongs_to :project,
    foreign_key: :project_id,
    class_name: :Project

  # A Section can have 0 or many tasks
  has_many :tasks,
    foreign_key: :section_id,
    class_name: :Task
end

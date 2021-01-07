# == Schema Information
#
# Table name: projects
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  description  :text
#  workspace_id :integer          not null
#  creator_id   :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  icon         :string           default("a0")
#
class Project < ApplicationRecord
  validates :name, presence: true,
                   length: { maximum: 25, too_long: "can't be over 25 characters" },
                   uniqueness: { scope: :workspace_id }

  validate :name_cannot_start_with_space

  # attr_reader :icon
  before_create :randomize_icon_color

  def name_cannot_start_with_space
    if name.present? && name.starts_with?(" ")
      errors.add(:name, "cannot start with a space")
    end
  end

  # Randomly pick color for new project
  def randomize_icon_color
    self.icon = "a".concat(rand(0..9).to_s)
  end

  # * BUILT-IN ASSOCIATIONS ----------------------------------------

  # Join Table for Users and their Projects on their Workspaces
  # ! Remove if we're able to associate projects through workspaces
  # has_many :users_projects,
  #   foreign_key: :project_id,
  #   class_name: :UsersProject,
  #   dependent: :destroy # ! necessary?

  # ! Attempt to associate projects through workspace
  # has_many :users,
  #   through: :users_projects,
  #   source: :user
  has_many :users,
    through: :workspace,
    source: :users

  # A Project has 1 creator
  belongs_to :project_creator,
    foreign_key: :creator_id,
    class_name: :User

  # A Project can belong to only 1 workspace
  belongs_to :workspace,
    foreign_key: :workspace_id,
    class_name: :Workspace

  # A Project have 0 or more tasks
  has_many :tasks,
    foreign_key: :project_id,
    class_name: :Task,
    dependent: :destroy

  # A Project can have 0 or more sections
  has_many :sections,
    foreign_key: :project_id,
    class_name: :Section,
    dependent: :destroy

  # * CUSTOM ASSOCIATIONS ----------------------------------------

end

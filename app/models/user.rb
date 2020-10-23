# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  include Api::UsersHelper

  validates :username, presence: true #, uniqueness: true
  validates :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: {minimum: 6}, allow_nil: true
  validates :email, presence: true, uniqueness: true #, format: { with: URI::MailTo::EMAIL_REGEXP } 

  # * BUILT-IN ASSOCIATIONS ----------------------------------------

  # Join Table for Workspaces that User is a member of
  has_many :users_workspaces,
    foreign_key: :user_id,
    class_name: :UsersWorkspace

  # ! Workspaces
  has_many :workspaces,
    through: :users_workspaces,
    source: :workspace

  # A User might have 0 or many own (created) workspaces
  has_many :own_workspaces,
    foreign_key: :creator_id,
    class_name: :Workspace

  # Join Table for Users and their Projects on their Workspaces
  has_many :users_projects,
    foreign_key: :user_id,
    class_name: :UsersProject
  
  # ! Projects
  has_many :projects,
    through: :users_projects,
    source: :project
  
  # A User might have 0 or many own (created) projects
  has_many :own_projects,
    foreign_key: :creator_id,
    class_name: :Project

  # Join Table for Users and their Tasks on their Projects
  has_many :users_tasks,
    foreign_key: :user_id,
    class_name: :UsersTask
  
  # ! Tasks
  has_many :tasks,
    through: :users_tasks,
    source: :task

  # A User might have 0 or many own (created) tasks
  has_many :own_tasks,
    foreign_key: :creator_id,
    class_name: :Task

  # def my_workspaces_users
  #   self.workspaces.include(:users).users.where.not(id: self.id)
  # end

  # * CUSTOM ASSOCIATIONS ----------------------------------------

  

  # * USER AUTH

  attr_reader :password
  after_initialize :ensure_session_token

  # Find user by login email and password from form data
  # def self.find_by_credentials(email, pw)
  #   user = self.find_by(email: email)
  #   return nil if user.nil?
  #   user.is_password?(pw) ? user : nil
  # end
  # Modified to return array [user, errormsg]
  def self.find_by_credentials(email, pw)
    return [nil, "Email and password required"] if email == ""
    user = self.find_by(email: email)
    return [nil, "Email not found"] if user.nil?
    user.is_password?(pw) ? [user, ""] : [nil, "Password is invalid"]
  end


  # Set password_digest to digested pw upon initializing new User
  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  # Checks to see if given pw matches actual password
  def is_password?(pw)
    return BCrypt::Password.new(self.password_digest) == pw
  end

  # Resets user's session token and returns the new one
  def reset_session_token!
    # self.session_token = SecureRandom::urlsafe_base64(16)
    self.session_token = generate_unique_session_token
    self.save!
    return self.session_token
  end

  private
  # Makes sure user has a session token before saving to DB
  def ensure_session_token
    # self.session_token ||= SecureRandom::urlsafe_base64(16)
    self.session_token ||= generate_unique_session_token
  end
  
  # Makes sure there are no session token conflicts (however small that chance may be)
  def generate_unique_session_token
    token = SecureRandom.urlsafe_base64(16)
    ##
    # Just in case there is a session_token conflict, make sure
    # not to throw a validation error at the user!
    ##
    # checks through session_token column in users table
    while self.class.exists?(session_token: token)
      token = SecureRandom.urlsafe_base64(16)
    end

    token
  end
  
end

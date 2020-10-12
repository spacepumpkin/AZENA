class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: {minimum: 6}, allow_nil: true

  attr_reader :password

  before_validation :ensure_session_token

  # USER AUTH

  # Find user by username and password from form data
  def self.find_by_credentials(username, pw)
    user = self.find_by(username: username)
    return nil if user.nil?
    user.is_password?(pw) ? user : nil
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
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    return self.session_token
  end

  # Makes sure user has a session token before saving to DB
  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end
  
  
end

class User < ApplicationRecord
  validates :username, presence: true #, uniqueness: true
  validates :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: {minimum: 6}, allow_nil: true
  validates :email, presence: true, uniqueness: true #, format: { with: URI::MailTo::EMAIL_REGEXP } 

  attr_reader :password

  after_initialize :ensure_session_token

  # USER AUTH

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
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    return self.session_token
  end

  private
  # Makes sure user has a session token before saving to DB
  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end
  
  
end

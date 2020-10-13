class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  # Everything here is for a temporary ApplicationController instance that only
  #persists until the end of a request

  private
  # Get current user based on session token
  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  # Not necessary without views; renders message in case action accessed without being logged in.
  # 401 : Unauthorized
  def require_logged_in
    (render json: "You need to be logged in for this.", status: 401) unless logged_in?
  end

  # Checks if browser's session token matches
  def logged_in?
    !!current_user
  end

  # If everything checks out, create new session for user 
  #(set current user to user and assign new session_token to user and session)
  def login!(user)
    @current_user = user;
    session[:session_token] = user.reset_session_token!
  end

  # Reset current user's session token + deletes session's session token, current user
  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end
end

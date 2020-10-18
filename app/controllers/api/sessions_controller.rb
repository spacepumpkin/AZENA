class Api::SessionsController < ApplicationController

  before_action :require_logged_in, only: [:destroy]

  def create
    # @user = User.find_by_credentials(
    #   params[:user][:email],
    #   params[:user][:password]
    # )
    # Modified to add specific error msg
    @user, error_msg = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      login!(@user)
      # render api_user_url(@user.id)
      p current_user
      render "api/users/show", status: 200
    else
      # flash.now[:errors] = ["Invalid email or password"]
      # render json: ["Invalid email or password"], status: 422
      # Modified to return specific error message
      render json: ["#{error_msg}"], status: 422
    end
  end

  def destroy
    # if logged_in?
      logout! 
      render json: {message: "Logout Successful"}, status: 200
    # else
    #   render json: {message: "You need to be logged in."}, status: 401
    # end
  end

end

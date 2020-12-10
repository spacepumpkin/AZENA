class Api::SessionsController < ApplicationController

  # before_action :require_logged_in, only: [:destroy] # ! remove to allow 2 people be logged in

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
      # render "api/users/show", status: 200
      render "api/users/everything", status: 200 # for big fetch
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

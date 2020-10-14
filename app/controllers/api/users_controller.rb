class Api::UsersController < ApplicationController

  # Attempt to create a new user based on form inputs
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show #, status: 200
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  # Returns user information
  def show
    @user = User.find_by(id: params[:id])

    # if user exists, return id, username, email; else 404 Not found
    if @user
      render :show #, status: 200
    else
      render json: @user.errors.full_messages, status: 404
    end
  end

  # ! add update and destroy routes later

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end

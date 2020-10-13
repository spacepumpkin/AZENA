class SessionsController < ApplicationController

  before_action :require_logged_in, only: [:destroy]

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login!(@user)
      render "api/users/show", status: 200
    else
      # flash.now[:errors] = ["Invalid username or password"]
      render json: ["Invalid username or password"], status: 422
    end
  end

  def destroy
    logout!
    render json: {message: "Logout Successful"}, status: 200
  end

end

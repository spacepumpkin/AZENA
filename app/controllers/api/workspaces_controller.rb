class Api::WorkspacesController < ApplicationController

  before_action :require_logged_in

  def create
    @workspace = Workspace.new(workspace_params)
    @workspace.creator_id = current_user.id
    if @workspace.save
      current_user.workspaces << @workspace
      render :show #, status: 200
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  def destroy
    @workspace = Workspace.find(params[:id])
    if @workspace.destroy
      render :show #, status: 200
    else
      render json: ["Workspace could not be removed"], status: 422
    end
  end

  def index
    @workspaces = current_user.workspaces
    render :index
  end

  def show
    @workspace = Workspace.find(params[:id])
    if @workspace
      render :show #, status: 200
    else
      render ["Workspace was not found"], status: 422
    end
  end

  private

  def workspace_params
    params.require(:workspace).permit(:name, :description)
  end

end

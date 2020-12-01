class Api::WorkspacesController < ApplicationController

  before_action :require_logged_in

  def index
    @workspaces = current_user.workspaces
    render :index
  end

  def show
    @workspace = Workspace.includes(:projects).find(params[:id])
    if @workspace
      render :show #, status: 200
    else
      render json: ["Workspace was not found"], status: 422
    end
  end

  def update
    @workspace = Workspace.find(params[:id])
    if @workspace.creator_id != current_user.id
      render json: ["Workspace can only be updated by its creator"], status: 422
      return
    end
    if @workspace.update(workspace_params)
      render :show #, status: 200
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

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

  private

  def workspace_params
    params.require(:workspace).permit(:name, :description)
  end

end

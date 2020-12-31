class Api::WorkspacesController < ApplicationController
  before_action :require_logged_in

  def index
    @workspaces = current_user.workspaces
    render :index, status: 200
  end

  def show
    @workspace = Workspace.includes(:projects).find_by(id: params[:id])
    if @workspace
      render :show, status: 200
    else
      render json: ["Workspace was not found"], status: 404
    end
  end

  def update
    @workspace = Workspace.find_by(id: params[:id])
    if @workspace.nil?
      render json: ["Workspace could not be found"], status: 404
      return
    end

    new_name = params[:workspace][:name]
    if (new_name && new_name != @workspace.name) && (@workspace.creator_id != current_user.id)
      render json: ["Workspace name can only be updated by its creator"], status: 422
      return
    end

    if @workspace.update(workspace_params)
      render :show, status: 200
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  def create
    @workspace = Workspace.new(workspace_params)
    @workspace.creator_id = current_user.id
    if @workspace.save
      current_user.workspaces << @workspace
      render :show, status: 200
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  def destroy
    @workspace = Workspace.find_by(id: params[:id])
    if @workspace.nil?
      render json: ["Workspace could not be found"], status: 404
      return
    end
    if @workspace.creator_id != current_user.id
      render json: ["Workspace can only be deleted by its creator"], status: 422
      return
    end
    if @workspace.destroy
      render :show, status: 200
    else
      render json: ["Workspace could not be deleted"], status: 422
    end
  end

  private

  def workspace_params
    params.require(:workspace).permit(:name, :description)
  end
end

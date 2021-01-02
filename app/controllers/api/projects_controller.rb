class Api::ProjectsController < ApplicationController
  before_action :require_logged_in

  def create
    @project = Project.new(project_params)
    @project.creator_id = current_user.id
    if @project.save
      current_user.projects << @project
      render :show, status: 200
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def update
    @project = Project.find_by(id: params[:id])
    if @project.nil?
      render json: ["Project was not found"], status: 404
      return
    end
    # if @project.creator_id != current_user.id
    #   render json: ["Project can only be updated by its creator"], status: 422
    #   return
    # end
    if @project.update(project_params)
      render :show, status: 200
    else
      render json: ["Project could not be updated"], status: 422
    end
  end

  def destroy
    @project = Project.find_by(id: params[:id])
    if @project.nil?
      render json: ["Project was not found"], status: 404
      return
    end
    if @project.creator_id != current_user.id
      render json: ["Project can only be deleted by its creator"], status: 422
      return
    end
    if @project.destroy
      render :show, status: 200
    else
      render json: ["Project could not be removed"], status: 422
    end
  end

  # ! Not used?
  def index
    @projects = current_user.projects
    render :index
  end

  # ! Not used?
  def show
    @project = Project.includes(:tasks).find_by(id: params[:id])
    if @project
      render :show, status: 200
    else
      render json: ["Project was not found"], status: 404
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :description, :workspace_id, :icon)
  end
end

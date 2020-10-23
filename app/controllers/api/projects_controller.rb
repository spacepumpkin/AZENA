class Api::ProjectsController < ApplicationController

  before_action :require_logged_in

  def create
    @project = Project.new(project_params)
    @project.creator_id = current_user.id
    if @project.save
      current_user.projects << @project
      render :show #, status: 200
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def destroy
    @project = Project.find(params[:id])
    if @project.destroy
      render :show #, status: 200
    else
      render json: ["Project could not be removed"], status: 422
    end
  end

  def index
    @projects = current_user.projects
    render :index
  end

  def show
    @project = Project.includes(:tasks).find(params[:id])
    if @project
      render :show #, status: 200
    else
      render ["Project was not found"], status: 422
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :description, :workspace_id)
  end
end

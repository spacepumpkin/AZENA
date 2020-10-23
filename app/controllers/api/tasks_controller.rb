class Api::TasksController < ApplicationController

  before_action :require_logged_in

  def create
    @task = Task.new(task_params)
    @task.creator_id = current_user.id
    if @task.save
      current_user.tasks << @task
      render :show #, status: 200
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def destroy
    @task = Task.find(params[:id])
    if @task.destroy
      render :show #, status: 200
    else
      render json: ["Task could not be removed"], status: 422
    end
  end

  def index
    @tasks = current_user.tasks
    render :index
  end

  def show
    @task = Task.find(params[:id])
    if @task
      render :show #, status: 200
    else
      render ["Task was not found"], status: 422
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :due_date, :project_id)
  end

end

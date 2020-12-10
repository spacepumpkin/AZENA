class Api::TasksController < ApplicationController
  before_action :require_logged_in

  def create
    @task = Task.new(task_params)
    @task.creator_id = current_user.id
    if @task.save
      current_user.tasks << @task # * Add to current user's tasks by default when created
      @users_task = UsersTask.find_by(task_id: @task.id) # Also send back users_task when task is created
      # @users_task = UsersTask.create(user_id: current_user.id, task_id: @task.id) # Alternative method, same queries
      render :show #, status: 200
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def update
    @task = Task.find_by(id: params[:id])
    if @task.nil?
      render json: ["Task was not found"], status: 404
      return
    end
    if @task.update(task_params)
      render :show #, status: 200
    else
      render json: ["Task could not be updated"], status: 422
    end
  end

  def destroy
    @task = Task.find_by(id: params[:id])
    if @task.nil?
      render json: ["Task was not found"], status: 404
      return
    end
    @users_tasks = UsersTask.where(task_id: @task.id).to_a # Also send back users_tasks associated with task
    if @task.destroy
      render :show #, status: 200
    else
      render json: ["Task could not be removed"], status: 422
    end
  end

  # ! Not used atm
  def index
    @tasks = current_user.tasks
    render :index
  end

  # ! Not used atm
  def show
    @task = Task.find_by(id: params[:id])
    if @task
      render :show #, status: 200
    else
      render ["Task was not found"], status: 404
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :due_date, :project_id)
  end
end

class Api::UsersController < ApplicationController
  before_action :require_logged_in, only: [:show, :everything]

  # Attempt to create a new user based on form inputs
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      # render :show #, status: 200
      render :everything, status: 200 # ! for big fetch
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  # Returns user information (either current user's page or that of a co-member in a workspace)
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

  # Fetch every entity associated with current user (workspaces, projects, tasks, etc.)
  def everything
    @user = User.includes(:workspaces, :projects, :tasks).find_by(id: params[:id])
    render :everything
  end

  # Test Status -- PASS
  def assign_task
    users_task = UsersTask.includes(:user, :task).find_by(users_task_params)
    if users_task
      render json: ["Task '#{users_task.task.name}' is already assigned to #{users_task.user.username}"], status: 422
      return
    end

    @users_task = UsersTask.new(users_task_params)
    if @users_task.save
      render template: "api/users/_users_task", locals: { users_task: @users_task } #, status: 200

      # ! Backup that works:
      # render :show_users_task, status: 200
    else
      # render json: ["Task could not be assigned to #{@users_task.user.username}"], status: 422
      render json: @users_task.errors.full_messages, status: 422
    end
  end

  # Test Status -- PASS
  def unassign_task
    @users_task = UsersTask.includes(:user, :task).find_by(users_task_params)
    if @users_task.nil?
      render json: ["Task is not assigned to user"], status: 404
      return
    end
    if @users_task.destroy
      render template: "api/users/_users_task", locals: { users_task: @users_task } #, status: 200
      # ! Backup that works:
      # render :show_users_task, status: 200
    else
      # render json: ["Task could not be unassigned from #{@users_task.user.username}"], status: 422
      render json: @users_task.errors.full_messages, status: 422
    end
  end

  # Test Status -- PASS - Remove a workspace NOT owned by user from their associated workspaces
  def unassign_workspace
    @users_workspace = UsersWorkspace.includes(:user, :workspace).find_by(users_workspace_params)

    if @users_workspace.nil?
      render json: ["Workspace is not assigned to user"], status: 404
      return
    end

    if @users_workspace.destroy
      # Remove all associated tasks from user's assigned tasks; let frontend handle finding & sorting tasks to delete
      # workspace = Workspace.includes(:users, :tasks).find_by(id: @users_workspace.workspace_id)
      # users_tasks = workspace.projects_tasks

      users_tasks = Workspace.includes(:users, :projects_tasks).find_by(id: @users_workspace.workspace_id).projects_tasks
      user = User.find_by(id: @users_workspace.user_id)

      # Array of unassigned task ids
      task_ids = users_tasks.ids
      @users_task_ids = UsersTask.where(user_id: user.id, task_id: task_ids).ids

      users_tasks.each do |task|
        user.assigned_tasks.delete(task)
      end

      # Array of remaining task ids
      # @users_task_ids = user.users_task_ids

      # Custom view to send back users_workspace & users_task_ids
      render template: "api/users/_unassigned_users_workspace", locals: { users_workspace: @users_workspace, users_task_ids: @users_task_ids } #, status: 200
      # render template: "api/users/_users_workspace", locals: { users_workspace: @users_workspace } #, status: 200
    else
      render json: @users_workspace.errors.full_messages, status: 422
    end
  end

  # Test Status -- PASS
  def assign_workspace
    # @workspace = Workspace.find_by(id: users_workspace_params[:workspace_id])
    # @user = User.find_by(id: users_workspace_params[:user_id])
    @users_workspace = UsersWorkspace.new(
      user_id: params[:users_workspace][:user_id],
      workspace_id: params[:users_workspace][:workspace_id],
    )

    if @users_workspace.save
      render template: "api/users/_users_workspace", locals: { users_workspace: @users_workspace } #, status: 200
    else
      render json: @users_workspace.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def users_task_params
    params.require(:users_task).permit(:user_id, :task_id)
  end

  def users_workspace_params
    params.require(:users_workspace).permit(:user_id, :workspace_id)
  end
end

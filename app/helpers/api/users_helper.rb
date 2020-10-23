module Api::UsersHelper
  # Methods to be used after login (after session create or user create)

  # Self is user

  def my_workspaces
    self.workspaces
  end

  def my_workspaces_users
    # User.select().where.not(id: self.id)
    workspaces = self.workspaces.includes(:users)
    # workspaces_users = {}
    # workspaces.each do |workspace|
    #   workspaces_users[workspace.id] = workspace.users
    # end
    # return workspaces_users.uniq
    return workspaces.distinct.collect(&:users).uniq
  end

  def my_workspaces_projects

  end

  def my_projects_tasks
  end

  def my_usersWorkspaces
    
  end


  def my_own_workspaces
    self.own_workspaces
  end


end

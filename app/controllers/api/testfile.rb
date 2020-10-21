# User can create workspace, which he can then access through workspaces and own_workspaces -- PASS
demo = User.find_by(username: "demo")

# Create workspace, then add to current_user's workspaces
demo_workspace1 = Workspace.new(creator_id: demo.id, name: "workspacetest1")
demo.workspaces << demo_workspace1 # does Workspace.create then UsersWorkspace.create

# or for Seeding
# Create workspaces where creator == current_user.id
demo_workspace2 = Workspace.create(creator_id: demo.id, name: "workspacetest2")
demo_workspace3 = Workspace.create(creator_id: demo.id, name: "workspacetest2")

# Then add them to current_users' workspaces
demo.workspaces << demo.own_workspaces # does UsersWorkspace.create for each

# The workspace can reference the user -- PASS
Workspace.first.users
Workspace.first.workspace_creator

# Users can add other users to their workspace -- PASS
# NOTE: I THOUGHT THIS WAS A BUG BUT ACTUALLY WHEN YOU TEST IN RAILS C
# YOUR VARIABLES AREN'T ALWAYS LIVE, THEY DON'T ALWAYS UPDATE TO THE CURRENT DB
# SO WHEN I TRIED TO DO DEMO.WORKSPACES, IT DIDN'T WORK, BUT
# USER.FIRST.WORKSPACES WORKED



def workspace_params
  params.require(:workspace).permit(:name, :description)
end

@workspace = Workspace.new(workspace_params)
@workspace.creator_id = current_user.id
# @workspace.creator_id = params[:id]

if @workspace.save
  current_user.workpaces << @workspace

end